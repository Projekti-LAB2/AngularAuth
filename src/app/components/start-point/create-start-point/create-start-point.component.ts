import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StartPoint } from 'src/app/models/startPoint';

@Component({
  selector: 'app-create-start-point',
  templateUrl: './create-start-point.component.html',
  styleUrls: ['./create-start-point.component.css']
})
export class CreateStartPointComponent {
  startPoints: StartPoint[] = [];

  datav:any = undefined;
  formGroup = new FormGroup({
    StartPointId: new FormControl(this.datav, [Validators.required, Validators.email]),
    DeparatureCityName: new FormControl('',[Validators.required, Validators.minLength(1)]),
  })

  constructor(
    public dialogRef: MatDialogRef<CreateStartPointComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {startPoint: StartPoint, isEditMode: boolean},
  ) {}
  ngOnInit(): void {
    if(this.data?.isEditMode){
      this.formGroup.patchValue({
        StartPointId: this.data.startPoint.StartPointId,
        DeparatureCityName: this.data.startPoint.DeparatureCityName,
      })
    }
  }
  sendData(data:FormGroup) {
    const dataValue = {
      DeparatureCityName: data.value.DeparatureCityName
    }
    this.dialogRef.close(dataValue);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  hasError(formControlName:string, error:string) {
   if(formControlName === 'DeparatureCityName'){
      return this.formGroup.controls['DeparatureCityName'].hasError(error);
    }else if(formControlName === 'StartPointId'){
      return this.formGroup.controls['StartPointId'].hasError(error);
    }
    return false;
  }
}
