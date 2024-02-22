import { html, repeat } from '@microsoft/fast-element';
import type { Home } from './home';
import { Tutorial } from './tutorial';
import { sync } from '@genesislcap/foundation-utils';

export const HomeTemplate = html<Home>`
  <div class="container">
    <div class="title">
      <zero-icon class="big-icon" variant="solid" name="rocket"></zero-icon>
      <h2>Genesis Playground</h2>
    </div>
    <p class="subtitle">
      A set of components and applications built with Genesis Foundation UI and Genesis Server
      Framework
    </p>
    <div class="filters">
      <zero-text-field
        placeholder="Search"
        type="text"
        value=${sync((x) => x.searchedTerms)}
        appearance="filled"
        autofocus="true"
        size="80"
      ></zero-text-field>
    </div>
    <div class="content">
      ${repeat(
        (x) => (x.filteredTutorials ? x.filteredTutorials : x.tutorials),
        html<Tutorial>`
          <zero-card>
            <div
              class="tutorial-container"
              style="background-image: url(${(x) => x.imageUrl})"
            ></div>
            <h3>${(x) => x.title}</h3>
            <p>${(x) => x.description}</p>
            <div class="buttons">
              <zero-button appearance="accent" @click=${(x, c) => c.parent.navigateTo(x.route)}>
                <zero-icon variant="solid" name="clapperboard"></zero-icon>
                See App
              </zero-button>
              <a href="${(x) => x.githubLink}" target="_blank">
                <zero-button appearance="accent">
                  <zero-icon variant="solid" name="code"></zero-icon>
                  Source Code
                </zero-button>
              </a>
            </div>
          </zero-card>
        `,
      )}
    </div>
  </div>
`;
