import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCitiesComponent } from './create-cities.component';

describe('CreateCitiesComponent', () => {
  let component: CreateCitiesComponent;
  let fixture: ComponentFixture<CreateCitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCitiesComponent]
    });
    fixture = TestBed.createComponent(CreateCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
