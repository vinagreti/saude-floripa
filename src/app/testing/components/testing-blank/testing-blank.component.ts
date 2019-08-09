import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-testing-blank',
  templateUrl: './testing-blank.component.html',
  styleUrls: ['./testing-blank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingBlankComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
