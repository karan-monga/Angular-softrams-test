import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder  } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Bonus points!
describe('MemberDetailsComponent', () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
      ],
      providers: [
        HttpClient,
        FormBuilder,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.memberForm.valid).toBeFalsy();
  });

  it('form invalid when not complete', () => {
    component.memberForm.controls['firstName'].setValue('');
    component.memberForm.controls['lastName'].setValue('');
    component.memberForm.controls['jobTitle'].setValue('');
    component.memberForm.controls['team'].setValue('');
    component.memberForm.controls['status'].setValue('Active');
    expect(component.memberForm.valid).toBeFalsy();

  });


  it('Entering just first & last name and form should be disabled and invalid', () => {

    component.memberForm.controls['firstName'].setValue('Jay');
    component.memberForm.controls['lastName'].setValue('Ordway');
    expect(component.memberForm.valid).toBeFalsy();
  });


  it('Entering all fields and form should be valid and enabled', () => {

    component.memberForm.controls['firstName'].setValue('Jay');
    component.memberForm.controls['lastName'].setValue('Ordway');
    component.memberForm.controls['jobTitle'].setValue('Driver');
    component.memberForm.controls['team'].setValue('Formula 1 - Car 77');
    component.memberForm.controls['status'].setValue('Active');

    expect(component.memberForm.valid).toBeTruthy();
  });

});
