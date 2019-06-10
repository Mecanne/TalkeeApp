import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TalkeeApp';

  constructor(public authService: AuthService) { }
}
