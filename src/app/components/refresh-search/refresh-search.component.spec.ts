import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefreshSearchComponent } from './refresh-search.component';

describe('RefreshSearchComponent', () => {
  let component: RefreshSearchComponent;
  let fixture: ComponentFixture<RefreshSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefreshSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefreshSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
