import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warpper-content',
  templateUrl: './app-warpper-content.component.html',
  styleUrls: ['./app-warpper-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppWarpperContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
