import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@services/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService
  ) { }

  login() {
    this.authService.login('tokenxyz');
  }

}
