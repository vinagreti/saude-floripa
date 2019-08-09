import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-wrapper-private',
  templateUrl: './app-wrapper-private.component.html',
  styleUrls: ['./app-wrapper-private.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWrapperPrivateComponent {

  constructor(
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout();
  }

}
