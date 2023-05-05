import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  formGroup = new FormGroup({
    firstName: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    lastName: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    email: new FormControl(``, [Validators.required, Validators.email]),
    password: new FormControl(``, [Validators.required, Validators.minLength(6)])
  })
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  hasError(formControlName:string, error:string) {
    if(formControlName === 'email'){
      return this.formGroup.controls['email'].hasError(error);
    }else if(formControlName === 'password'){
      return this.formGroup.controls['password'].hasError(error);
    }else if(formControlName === 'firstName'){
      return this.formGroup.controls['firstName'].hasError(error);
    }else if(formControlName === 'lastName'){
      return this.formGroup.controls['lastName'].hasError(error);
    }
    return false;
  }
  logIn() {
    this.router.navigate(['./login'])
  }
}
