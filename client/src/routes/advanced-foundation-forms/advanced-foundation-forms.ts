import { customElement, FASTElement } from '@microsoft/fast-element';
import { AdvancedFoundationFormsStyles as styles } from './advanced-foundation-forms.styles';
import { AdvancedFoundationFormsTemplate as template } from './advanced-foundation-forms.template';

@customElement({
  name: 'advanced-foundation-forms',
  template,
  styles,
})
export class AdvancedFoundationForms extends FASTElement {}
