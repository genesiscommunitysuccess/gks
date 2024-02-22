import {
  Auth,
  FoundationAnalytics,
  FoundationAnalyticsEvent,
  FoundationAnalyticsEventType,
  Session,
} from '@genesislcap/foundation-comms';
import {
  defaultLoginConfig,
  LoginConfig,
  Settings as LoginSettings,
} from '@genesislcap/foundation-login';
import { Constructable } from '@microsoft/fast-element';
import { Container, optional } from '@microsoft/fast-foundation';
import { Route, RouterConfiguration } from '@microsoft/fast-router';
import { defaultLayout, loginLayout } from '../layouts';
import { Home } from './home/home';
import { NotFound } from './not-found/not-found';
import { FoundationFormsIntro } from './foundation-forms-intro/foundation-forms-intro';
import { AdvancedFoundationForms } from './advanced-foundation-forms/advanced-foundation-forms';
import { CustomEntityManagement } from './custom-entity-management/custom-entity-management';
import { FoundationFormWithTabs } from './foundation-form-with-tabs/foundation-form-with-tabs';
import { FoundationFormStepper } from './foundation-form-stepper/foundation-form-stepper';
import { Tutorial } from './home/tutorial';
import { TemplateSwitchStatement } from './template-switch-statement/template-switch-statement';

// eslint-disable-next-line
declare var ENABLE_SSO: string;

const ssoSettings =
  typeof ENABLE_SSO !== 'undefined' && ENABLE_SSO === 'true'
    ? {
        autoAuth: true,
        sso: {
          toggled: true,
          identityProvidersPath: 'sso/list',
        },
      }
    : {};

export class MainRouterConfig extends RouterConfiguration<LoginSettings> {
  constructor(
    @Auth private auth: Auth,
    @Container private container: Container,
    @FoundationAnalytics private analytics: FoundationAnalytics,
    @Session private session: Session,
    @optional(LoginConfig)
    private loginConfig: LoginConfig = { ...defaultLoginConfig, autoAuth: true, autoConnect: true },
  ) {
    super();
    this.generateTutorialRoutes();
  }

  public allRoutes = [{ index: 1, path: 'home', title: 'Home', icon: 'home', variant: 'solid' }];

  public generateTutorialRoutes() {
    const tutorialsArray = JSON.parse(localStorage.getItem('tutorials') || '[]');
    let index = 2;
    tutorialsArray.forEach((tutorial: Tutorial) => {
      this.allRoutes.push({
        index: index,
        path: tutorial.route,
        title: tutorial.title,
        icon: 'code',
        variant: 'solid',
      });
      index++;
    });
  }
  public configure() {
    this.title = 'Playground';
    this.defaultLayout = defaultLayout;

    const authPath = 'login';

    this.routes.map(
      { path: '', redirect: authPath },
      {
        path: authPath,
        name: 'login',
        title: 'Login',
        element: async () => {
          const { configure, define } = await import(
            /* webpackChunkName: "foundation-login" */
            '@genesislcap/foundation-login'
          );
          configure(this.container, {
            autoConnect: true,
            defaultRedirectUrl: 'home',
            ...ssoSettings,
          });
          return define({
            name: `genesisgks-root-login`,
            /**
             * You can augment the template and styles here when needed.
             */
          });
        },
        layout: loginLayout,
        settings: { public: true },
        childRouters: true,
      },
      { path: 'home', element: Home, title: 'Home', name: 'home' },
      { path: 'not-found', element: NotFound, title: 'Not Found', name: 'not-found' },
      {
        path: 'foundation-forms-intro',
        element: FoundationFormsIntro,
        title: 'Foundation Forms intro',
        name: 'foundation-forms-intro',
      },
      {
        path: 'advanced-foundation-forms',
        element: AdvancedFoundationForms,
        title: 'Advanced Foundation Forms',
        name: 'advanced-foundation-forms',
      },
      {
        path: 'foundation-form-with-tabs',
        element: FoundationFormWithTabs,
        title: 'Foundation Form with Tabs',
        name: 'foundation-form-with-tabs',
      },
      {
        path: 'foundation-form-stepper',
        element: FoundationFormStepper,
        title: 'Foundation Form Stepper',
        name: 'foundation-form-stepper',
      },
      {
        path: 'custom-entity-management',
        element: CustomEntityManagement,
        title: 'Custom Entity Management',
        name: 'custom-entity-management',
      },
      {
        path: 'template-switch-statement',
        element: TemplateSwitchStatement,
        title: 'Template Switch Statement',
        name: 'template-switch-statement',
      },
    );

    const auth = this.auth;

    /**
     * Example of a FallbackRouteDefinition
     */
    this.routes.fallback(() =>
      this.auth.isLoggedIn ? { redirect: 'not-found' } : { redirect: authPath },
    );

    /**
     * Example of a NavigationContributor
     */
    this.contributors.push({
      navigate: async (phase) => {
        const settings = phase.route.settings;

        this.analytics.trackEvent(FoundationAnalyticsEventType.routeChanged, <
          FoundationAnalyticsEvent.RouteChanged
        >{
          path: phase.route.endpoint.path,
        });

        /**
         * If public route don't block
         */
        if (settings && settings.public) {
          return;
        }

        /**
         * If logged in don't block
         */
        if (this.auth.isLoggedIn) {
          return;
        }

        /**
         * If allowAutoAuth and session is valid try to connect+auto-login
         */
        if (this.loginConfig.autoAuth && (await auth.reAuthFromSession())) {
          return;
        }

        /**
         * Otherwise route them somewhere, like to a login
         */
        phase.cancel(() => {
          this.session.captureReturnUrl();
          Route.name.replace(phase.router, authPath);
        });
      },
    });
  }

  public construct<T>(Type: Constructable<T>): T {
    return this.container.get(Type) as T;
  }
}
