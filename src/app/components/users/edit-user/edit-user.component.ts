import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  formGroup = new FormGroup({
    FirstName: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    LastName: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    Email: new FormControl(``, [Validators.required, Validators.email]),
    UserName: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    Role: new FormControl(``,[Validators.required]),
  })

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {user: User},
  ) {}
  ngOnInit(): void {
    this.formGroup.patchValue({
      FirstName: this.data.user.firstName,
      LastName: this.data.user.lastName,
      Email: this.data.user.email,
      UserName: this.data.user.userName,
      Role: this.data.user.role,
    })
  }
  sendData(data:FormGroup) {
    this.dialogRef.close(data.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  hasError(formControlName:string, error:string) {
    if(formControlName === 'Email'){
      return this.formGroup.controls['Email'].hasError(error);
    }else if(formControlName === 'Role'){
      return this.formGroup.controls['Role'].hasError(error);
    }else if(formControlName === 'FirstName'){
      return this.formGroup.controls['FirstName'].hasError(error);
    }else if(formControlName === 'lastName'){
      return this.formGroup.controls['LastName'].hasError(error);
    }else if(formControlName === 'UserName'){
      return this.formGroup.controls['UserName'].hasError(error);
    }
    return false;
  }
}
