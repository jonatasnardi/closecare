import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPokeComponent } from './form-poke.component';

describe('FormPokeComponent', () => {
  let component: FormPokeComponent;
  let fixture: ComponentFixture<FormPokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
