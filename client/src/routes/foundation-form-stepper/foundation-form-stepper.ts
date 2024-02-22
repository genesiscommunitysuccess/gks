import { customElement, FASTElement } from '@microsoft/fast-element';
import { FoundationFormStepperStyles as styles } from './foundation-form-stepper.styles';
import { FoundationFormStepperTemplate as template } from './foundation-form-stepper.template';

@customElement({
  name: 'foundation-form-stepper',
  template,
  styles,
})
export class FoundationFormStepper extends FASTElement {}
