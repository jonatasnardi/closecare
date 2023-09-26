import { Component } from '@angular/core';
import { StateService } from './shared/services/state/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end-test';

  constructor(public stateService: StateService) {}
}
