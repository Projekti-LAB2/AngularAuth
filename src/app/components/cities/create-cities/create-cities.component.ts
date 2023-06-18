import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from 'src/app/models/City';

@Component({
  selector: 'app-create-cities',
  templateUrl: './create-cities.component.html',
  styleUrls: ['./create-cities.component.css']
})
export class CreateCitiesComponent {
  cities: City[] = [];

  datav:any = undefined;
  formGroup = new FormGroup({
    CityId: new FormControl(this.datav, [Validators.required, Validators.email]),
    CityName: new FormControl('',[Validators.required, Validators.minLength(1)]),
  })

  constructor(
    public dialogRef: MatDialogRef<CreateCitiesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {city: City, isEditMode: boolean},
  ) {}
  ngOnInit(): void {
    if(this.data?.isEditMode){
      this.formGroup.patchValue({
        CityId: this.data.city.CityId,
        CityName: this.data.city.CityName,
      })
    }
  }
  sendData(data:FormGroup) {
    const dataValue = {
      CityName: data.value.CityName
    }
    this.dialogRef.close(dataValue);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  hasError(formControlName:string, error:string) {
   if(formControlName === 'CityName'){
      return this.formGroup.controls['CityName'].hasError(error);
    }else if(formControlName === 'CityId'){
      return this.formGroup.controls['CityId'].hasError(error);
    }
    return false;
  }
}
