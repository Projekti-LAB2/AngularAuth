import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formGroup = new FormGroup({
    email: new FormControl(``, [Validators.required, Validators.email]),
    password: new FormControl<string | null>(``, [Validators.required, Validators.minLength(6)])
  })
  constructor() { }

  ngOnInit(): void {
  }
  hasError(formControlName:string, error:string) {
    if(formControlName === 'email'){
      return this.formGroup.controls['email'].hasError(error);
    }else{
      return this.formGroup.controls['password'].hasError(error);
    }
  }
}
