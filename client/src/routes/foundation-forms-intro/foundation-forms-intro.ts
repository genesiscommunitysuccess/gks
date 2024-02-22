import { customElement, FASTElement, observable } from '@microsoft/fast-element';
import { FoundationFormsIntroStyles as styles } from './foundation-forms-intro.styles';
import { FoundationFormsIntroTemplate as template } from './foundation-forms-intro.template';

export interface FormDatum { key: string, value: string}

@customElement({
  name: 'foundation-forms-intro',
  template,
  styles,
})
export class FoundationFormsIntro extends FASTElement {

  @observable formData: FormDatum[];

  handleChange(e): void {
    this.formData = Object.keys(e.target.data).map(key => ({ key, value: e.target.data[key]}));
  }
}
