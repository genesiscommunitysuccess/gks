import { customElement, FASTElement } from '@microsoft/fast-element';
import { CustomEntityManagementStyles as styles } from './custom-entity-management.styles';
import { CustomEntityManagementTemplate as template } from './custom-entity-management.template';

@customElement({
  name: 'custom-entity-management',
  template,
  styles,
})
export class CustomEntityManagement extends FASTElement {}
