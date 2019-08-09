import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-non-auth',
  templateUrl: './app-wrapper-non-auth.component.html',
  styleUrls: ['./app-wrapper-non-auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWrapperNonAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
