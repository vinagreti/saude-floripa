import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingBlankComponent } from './testing-blank.component';

describe('TestingBlankComponent', () => {
  let component: TestingBlankComponent;
  let fixture: ComponentFixture<TestingBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
