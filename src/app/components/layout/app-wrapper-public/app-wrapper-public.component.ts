import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-public',
  templateUrl: './app-wrapper-public.component.html',
  styleUrls: ['./app-wrapper-public.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWrapperPublicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
