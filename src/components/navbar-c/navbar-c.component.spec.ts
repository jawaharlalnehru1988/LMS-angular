import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCComponent } from './navbar-c.component';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BookService } from '../../allservices/book.service';

describe('NavbarCComponent', () => {
  let component: NavbarCComponent;
  let fixture: ComponentFixture<NavbarCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarCComponent, RouterModule.forRoot([]),],
      providers: [provideHttpClient(),  BookService],
      

    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
