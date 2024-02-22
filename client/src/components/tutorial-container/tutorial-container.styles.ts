import { css } from '@microsoft/fast-element';

export const TutorialContainerStyles = css`
  :host {
  }

  .sample {
    border-top: 1px solid white;
    height: 100%;
    margin-top: 15px;
    padding-top: 15px;
    overflow: auto;
  }

  .container {
    padding: 10px;
    height: 100%;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }

  .subtitle {
    margin: auto;
    margin-top: -45px;
    background-color: var(--neutral-layer-2);
    text-align: center;
    max-width: 600px;
    padding: 10px;
  }

  .subtitle h2,
  h4 {
    padding: 5px;
    padding-left: 0;
    margin: 0;
    font-weight: 300;
  }

  .subtitle h2 {
    font-weight: 400;
  }

  .back-arrow {
    margin-left: 0;
  }

  .back-arrow zero-icon {
    font-size: 30px;
  }
`;
