import { css } from '@microsoft/fast-element';
import { stylesFontFaces, stylesTemplateTutorials } from '../../styles';

export const HomeStyles = css`
  ${stylesFontFaces}
  ${stylesTemplateTutorials}
  :host {
  }

  .content {
    display: flex;
    flex-direction: row;
    height: 100%;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-y: auto;
    place-content: flex-start center;
  }

  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .title h2,
  .title .big-icon {
    padding-right: 10px;
  }

  .title .big-icon {
    font-size: 30px;
  }

  .subtitle {
    margin-left: 10px;
    margin-top: 0px;
  }

  zero-card {
    margin: 10px;
    padding: 10px;
    width: 350px;
    height: 350px;
  }

  zero-card:hover {
    background-color: rgba(0, 0, 0, 0.4);
    background-blend-mode: darken;
  }

  zero-card h3 {
    margin: 0;
    padding: 0;
    font-weight: 500;
  }

  zero-card p {
    margin: 5px;
    margin-left: 0px;
    font-weight: 300;
  }

  .tutorial-container {
    display: flex;
    height: 150px;
    background-color: rgba(0, 0, 0, 1);
    background-repeat: no-repeat, repeat;
    background-position: center;
    background-size: cover;
    margin-bottom: 5px;
  }

  .buttons {
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-bottom: 5px;
  }

  .filters {
    text-align: center;
  }
`;
