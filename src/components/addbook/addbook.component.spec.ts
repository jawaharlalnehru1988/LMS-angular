import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbookComponent } from './addbook.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AddbookComponent', () => {
  let component: AddbookComponent;
  let fixture: ComponentFixture<AddbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddbookComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
