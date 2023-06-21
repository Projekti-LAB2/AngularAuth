import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formGroup = new FormGroup({
    username: new FormControl(``, [Validators.required]),
    password: new FormControl<string | null>(``, [Validators.required, Validators.minLength(6)])
  })
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  hasError(formControlName:string, error:string) {

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
      this.authService.login(this.formGroup.value).subscribe(res => {
        this.authService.storeToken(res.token);
        const jwtHelper = new JwtHelperService();
        const decodedToken = jwtHelper.decodeToken(res.token);
        console.log(decodedToken);
        if (decodedToken && decodedToken.role === 'Admin') {
          this.router.navigate(['dashboard']);
        } else {
          const currentDomain = window.location.href;

          if (currentDomain.includes('http://localhost:4200/login')) {
            let newDomain = currentDomain.replace(
              'http://localhost:4200/login',
              'http://localhost:3000/'
            );
            window.location.replace(newDomain);
          }
        }
      },(err) => {
        alert(err.error.message);
      })
      
    }
  }
}
