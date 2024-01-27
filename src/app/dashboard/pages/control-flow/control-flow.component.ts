import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';
import UserComponent from '../user/user.component';

type Grade = 'A' | 'B' | 'C';
@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [CommonModule, TitleComponent, UserComponent],
  templateUrl: './control-flow.component.html'
})
export default class ControlFlowComponent {
  public showContent = signal(false);
  public showGrade = signal<Grade>('A');
  public frameworks = signal(['Angular', 'Vue', 'React', 'Laravel', 'Django']);
  public frameworks2 = signal([]);

  public setShowContent() {
    this.showContent.update(value => !value);
  }
  public toogleGrade(grado: Grade) {
    this.showGrade.update(value => grado);
  }

}
