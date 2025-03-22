import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { UserData } from '../../shared/interfaces';
import { BookService } from '../../allservices/book.service';
import { of } from 'rxjs';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let bookService : BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideHttpClient(), BookService]

    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    bookService = TestBed.inject(BookService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
