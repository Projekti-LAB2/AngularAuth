import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formGroup = new FormGroup({
    // email: new FormControl(``, [Validators.required, Validators.email]),
    username: new FormControl(``, [Validators.required]),
    password: new FormControl<string | null>(``, [Validators.required, Validators.minLength(6)])
  })
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  hasError(formControlName:string, error:string) {
    // if(formControlName === 'email'){
    //   return this.formGroup.controls['email'].hasError(error);
    // }
    if(formControlName === 'username'){
      return this.formGroup.controls['username'].hasError(error);
    }
    else{
      return this.formGroup.controls['password'].hasError(error);
    }
  }
  signUp() {
    this.router.navigate(['./signup']);
  }
  onLogin() {
    if(this.formGroup.valid){
      console.log(this.formGroup.value);

      this.authService.login(this.formGroup.value).subscribe(res => {
        alert(res.message);
      },(err) => {
        alert(err.error.message);
      })
      
    }
  }
}
