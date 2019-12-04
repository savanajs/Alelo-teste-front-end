import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksnotfoundComponent } from './tasksnotfound.component';

describe('TasksnotfoundComponent', () => {
  let component: TasksnotfoundComponent;
  let fixture: ComponentFixture<TasksnotfoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksnotfoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksnotfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
