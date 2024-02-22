import { customElement, FASTElement, observable } from '@microsoft/fast-element';
import { HomeStyles as styles } from './home.styles';
import { HomeTemplate as template } from './home.template';
import { Route } from '@microsoft/fast-router';
import { Tutorial } from './tutorial';
import thumb1 from './thumbnails/form1.png';
import thumb2 from './thumbnails/form2.png';
import thumb3 from './thumbnails/form3.png';
import thumb4 from './thumbnails/form4.png';
import thumb5 from './thumbnails/template-switch-statement.png';

@customElement({
  name: 'home-route',
  template,
  styles,
})
export class Home extends FASTElement {
  @observable public searchedTerms: string = '';
  @observable public filteredTutorials: Array<Tutorial>;

  public tutorials: Array<Tutorial> = [
    new Tutorial(
      'Introduction to Foundation Forms',
      'Form UI created automatically from a backend table. Also how to customize the form fields and listen to form changes.',
      'foundation-forms-intro',
      'https://github.com/genesislcap/genesis-gks/tree/develop/client/src/routes/foundation-forms-intro',
      thumb1,
    ),
    new Tutorial(
      '2 Columns layout + Advanced features',
      'Foundation Forms 2 Columns UI layout with some advanced features of foundation-forms, like connected render options to search for USER_PROFILES',
      'advanced-foundation-forms',
      'https://github.com/genesislcap/genesis-gks/tree/develop/client/src/routes/advanced-foundation-forms',
      thumb2,
    ),
    new Tutorial(
      'Foundation Form with Tabs',
      'Foundation form layout with Tabs, showing layout types inside tabs as: vertical layout, 2 columns layout and horizontal layout ',
      'foundation-form-with-tabs',
      'https://github.com/genesislcap/genesis-gks/tree/develop/client/src/routes/foundation-form-with-tabs',
      thumb3,
    ),
    new Tutorial(
      'Foundation Form with Stepper',
      'Foundation form layout with Stepper, showing layout types inside tabs as: vertical layout, 2 columns layout and horizontal layout ',
      'foundation-form-stepper',
      'https://github.com/genesislcap/genesis-gks/tree/develop/client/src/routes/foundation-form-stepper',
      thumb4,
    ),
    new Tutorial(
      'Entity-management with foundation-forms',
      'How to customize entity-management with foundation-forms',
      'custom-entity-management',
      'https://github.com/genesislcap/genesis-gks/tree/develop/client/src/routes/custom-entity-management',
      thumb5,
    ),
    new Tutorial(
      'Template switch statement with foundation web',
      'How to use switch statements in your template',
      'template-switch-statement',
      'https://github.com/genesislcap/genesis-gks/tree/develop/client/src/routes/template-switch-statement',
      thumb5,
    ),
  ];
  constructor() {
    super();
    const isFirstAccess = localStorage.getItem('tutorials') === null;
    localStorage.setItem('tutorials', JSON.stringify(this.tutorials));

    if (isFirstAccess) {
      location.reload();
    }
  }

  public async connectedCallback() {
    super.connectedCallback();
  }

  public searchedTermsChanged() {
    this.filteredTutorials = this.tutorials?.filter(
      (tutorial) =>
        tutorial.title.toLowerCase().includes(this.searchedTerms.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(this.searchedTerms.toLowerCase()),
    );
  }

  public navigateTo(path: string) {
    try {
      Route.path.push(path);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}
