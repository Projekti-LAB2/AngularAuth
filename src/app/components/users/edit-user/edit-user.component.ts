import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formGroup = new FormGroup({
    firstName: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    lastName: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    email: new FormControl(``, [Validators.required, Validators.email]),
    userName: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    role: new FormControl(``,[Validators.required]),
  })

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
  ) {}
  ngOnInit(): void {
    console.log(this.data,'data');
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  hasError(formControlName:string, error:string) {
    if(formControlName === 'email'){
      return this.formGroup.controls['email'].hasError(error);
    }else if(formControlName === 'role'){
      return this.formGroup.controls['role'].hasError(error);
    }else if(formControlName === 'firstName'){
      return this.formGroup.controls['firstName'].hasError(error);
    }else if(formControlName === 'lastName'){
      return this.formGroup.controls['lastName'].hasError(error);
    }else if(formControlName === 'userName'){
      return this.formGroup.controls['userName'].hasError(error);
    }
    return false;
  }
}
