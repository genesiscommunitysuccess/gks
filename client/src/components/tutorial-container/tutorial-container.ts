import { attr, customElement, FASTElement, observable } from '@microsoft/fast-element';
import { TutorialContainerStyles as styles } from './tutorial-container.styles';
import { TutorialContainerTemplate as template } from './tutorial-container.template';
import { Tutorial } from '../../routes/home/tutorial';

@customElement({
  name: 'tutorial-container',
  template,
  styles,
})
export class TutorialContainer extends FASTElement {
  @attr route: string;
  @observable public tutorial: Tutorial;

  public async connectedCallback() {
    super.connectedCallback();
    const tutorials = JSON.parse(localStorage.getItem('tutorials') || '[]');
    const route = this.route;
    this.tutorial = tutorials.find((t) => t.route === route);
  }

  public back() {
    history.back();
  }

  public openSource() {
    window.open(this.tutorial?.githubLink, '_blank');
  }
}
