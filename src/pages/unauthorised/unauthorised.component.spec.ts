import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorisedComponent } from './unauthorised.component';
import { RouterModule } from '@angular/router';

describe('UnauthorisedComponent', () => {
  let component: UnauthorisedComponent;
  let fixture: ComponentFixture<UnauthorisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnauthorisedComponent, RouterModule.forRoot([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthorisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
