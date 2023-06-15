import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    userName: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    password: new FormControl(``, [Validators.required, Validators.minLength(6)])
  })
  constructor(private router: Router, private authService: AuthService) { }

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
    }else if(formControlName === 'userName'){
      return this.formGroup.controls['userName'].hasError(error);
    }
    return false;
  }
  logIn() {
    this.router.navigate(['./login'])
  }
  signUp() {
    if(this.formGroup.valid){
      console.log(this.formGroup.value);

      this.authService.signUp(this.formGroup.value).subscribe(res => {
        alert(res.message);
        this.formGroup.reset()
      },(err) => {
        alert(err.error.message);
      })
      
    }
  }
}
