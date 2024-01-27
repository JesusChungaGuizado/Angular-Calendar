import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';


@Component({
  selector: 'app-change-detection',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TitleComponent],
  templateUrl: './change-detection.component.html'
})
export default class ChangeDetectionComponent {
  // CAPTURA LOS CAMBIOS(SEÑALES) DE MANERA RAPIDA Y EFICIENTE
  public currentFramework = computed(() => `Changed detection - ${this.frameworkAsSignal().name}`)
  public frameworkAsSignal = signal({
    name: 'Angular',
    date: 2016
  })
  public frameworkAsProperty = {
    name: 'Angular',
    date: 2016
  }

  constructor() {
    setTimeout(() => {
      this.frameworkAsSignal.update(value => (
        {
          ...value,
          name: 'React'
        }
      ))
      console.log("Hecho");

    }, 3000);
    setTimeout(() => {
      this.frameworkAsSignal.update(value => (
        {
          ...value,
          name: 'Larvel'
        }
      ))
      console.log("Hecho");

    }, 5000);
  }
}
