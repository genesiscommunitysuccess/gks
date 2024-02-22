import { html } from '@microsoft/fast-element';
import type { CustomEntityManagement } from './custom-entity-management';
import { ConnectedRenderersOptions, UiSchema } from '@genesislcap/foundation-forms';

const UI_SCHEMA: UiSchema = {
  type: 'VerticalLayout',
  elements: [
    { type: 'Control', scope: '#/properties/DESCRIPTION', label: 'Desc' },
    { type: 'Control', scope: '#/properties/NAME', label: 'Name' },
    {
      type: 'Control',
      scope: '#/properties/RIGHT_CODES',
      label: 'Right Codes',
      options: <ConnectedRenderersOptions>{
        allOptionsResourceName: 'RIGHT',
        valueField: 'CODE',
        labelField: 'CODE',
      },
    },
    { type: 'Control', scope: '#/properties/STATUS', label: 'Status' },
    {
      type: 'Control',
      scope: '#/properties/USER_NAMES',
      label: 'User Names',
      options: <ConnectedRenderersOptions>{
        allOptionsResourceName: 'USER',
        valueField: 'USER_NAME',
        labelField: 'USER_NAME',
      },
    },
  ],
};
export const CustomEntityManagementTemplate = html<CustomEntityManagement>`
  <tutorial-container :route="${() => 'custom-entity-management'}">
    <entity-management
      resourceName="ALL_PROFILES"
      updateEvent="EVENT_AMEND_PROFILE"
      deleteEvent="EVENT_DELETE_PROFILE"
      createEvent="EVENT_INSERT_PROFILE"
      :createFormUiSchema=${(x) => UI_SCHEMA}
      :updateFormUiSchema=${(x) => UI_SCHEMA}
    ></entity-management>
  </tutorial-container>
`;
