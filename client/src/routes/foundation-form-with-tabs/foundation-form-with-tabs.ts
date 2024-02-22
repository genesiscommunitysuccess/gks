import { customElement, FASTElement } from '@microsoft/fast-element';
import { FoundationFormWithTabsStyles as styles } from './foundation-form-with-tabs.styles';
import { FoundationFormWithTabsTemplate as template } from './foundation-form-with-tabs.template';

@customElement({
  name: 'foundation-form-with-tabs',
  template,
  styles,
})
export class FoundationFormWithTabs extends FASTElement {}
