import { Component, Input, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './title.component.html'
})
export class TitleComponent {
  //---------- Pongo !  dado que no se tiene inicializado la variable title-----//
  // Se pone required: true cuando es obligatorio pasarlo
  // Sino quedaria asi @Input() || @Input({ required: false }) :  cuando es opcional
  @Input({ required: true }) title!: string;

  // Pongo transform: booleanAttribute en withShadow  
  // para no indicarle un valor necesarimente al pasarlo como prop no es obligatorio
  // <app-title title="Control Flow" />  ===>    withShadow=false
  // <app-title title="Control Flow" withShadow />  ===>    withShadow=true

  @Input({ transform: booleanAttribute }) withShadow: boolean = false;
}
