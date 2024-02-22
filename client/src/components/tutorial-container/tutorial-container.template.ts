import { html, repeat } from '@microsoft/fast-element';
import type { TutorialContainer } from './tutorial-container';

export const TutorialContainerTemplate = html<TutorialContainer>`
  <div class="container">
    <div class="header-tutorial">
      <div class="buttons">
        <zero-button appearance="accent" class="back-arrow" @click=${(x) => x.back()}>
          <zero-icon variant="solid" name="angle-left"></zero-icon>
        </zero-button>

        <zero-button appearance="accent" @click=${(x) => x.openSource()}>
          <zero-icon variant="solid" name="code"></zero-icon>
          Source Code
        </zero-button>
      </div>
    </div>
    <div class="subtitle">
      <h2>${(x) => x.tutorial?.title}</h2>
      <h4>${(x) => x.tutorial?.description}</h4>
    </div>
    <div class="sample">
      <slot></slot>
    </div>
  </div>
`;
