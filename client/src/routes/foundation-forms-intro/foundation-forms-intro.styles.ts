import { css } from '@microsoft/fast-element';
import { stylesTemplateTutorials } from '../../styles';

export const FoundationFormsIntroStyles = css`
  ${stylesTemplateTutorials}
  :host {
  }

  zero-card {
    height: calc(100% - 180px);
    padding: 15px;
    width: 700px;
    overflow-y: scroll;
    flex: 1;
    margin: 10px;
  }
  
  .intro-container {
    display: flex;
  }
  
  .form-datum {
    margin-bottom: 10px;
  }
`;
