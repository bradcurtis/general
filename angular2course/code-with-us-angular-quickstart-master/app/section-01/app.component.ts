import { Component } from '@angular/core';

@Component({
  selector: 'my-app', // to use me, put <my-app> in index.html
  template: `
  <h1>Hello {{name}}</h1>
  <fieldset>
    <img [src]="image" />
  </fieldset>
  <label [style.color]="color">Favorite Color</label>
  <button (click)="clicked()">Toggle Color</button>

  `
})
export class AppComponent  {
  name = 'Angular';
  image = 'favicon.ico';
  color='red';

  clicked(){
    this.color = this.color === 'red' ? 'blue' :'red';
  }
}
