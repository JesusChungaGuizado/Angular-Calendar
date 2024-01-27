import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heavy-loaders-slow',
  standalone: true,
  imports: [CommonModule],
  template: `
   <section class="container-fluid " style="height: 500px; background-color: blue;" >
     <h1> HeavyLoadersSlow</h1>
   </section>
  `
})
export class HeavyLoadersSlowComponent {

  constructor() {
    console.log('Heavy Loaders Componet');

  }
}
