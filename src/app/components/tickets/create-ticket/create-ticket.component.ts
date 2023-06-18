import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from 'src/app/models/City';
import { StartPoint } from 'src/app/models/startPoint';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent {
  cities: City[] = [];
  startPoints: StartPoint[] = [];

  datav:any = undefined;
  formGroup = new FormGroup({
    TicketNumber: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    Price: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    StartPointId: new FormControl(this.datav, [Validators.required, Validators.email]),
    CityId: new FormControl(this.datav,[Validators.required, Validators.minLength(1)]),
    Time: new FormControl(``,[Validators.required]),
    Date: new FormControl(``,[Validators.required]),
  })

  constructor(
    public dialogRef: MatDialogRef<CreateTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {ticket: Ticket, isEditMode: boolean, 
                                                cities: City[], startPoints: StartPoint[]},
  ) {}
  ngOnInit(): void {
    this.cities = this.data.cities;
    this.startPoints = this.data.startPoints;

    if(this.data?.isEditMode){
      this.formGroup.patchValue({
        TicketNumber: this.data.ticket.TicketNumber,
        Price: this.data.ticket.Price.toString(),
        StartPointId: this.data.ticket.StartPointId,
        CityId: this.data.ticket.City.CityId,
        Time: this.data.ticket.Time,
        Date: this.data.ticket.Date,
      })
    }
  }
  sendData(data:FormGroup) {
    this.dialogRef.close(data.value);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  hasError(formControlName:string, error:string) {
    if(formControlName === 'TicketNumber'){
      return this.formGroup.controls['TicketNumber'].hasError(error);
    }else if(formControlName === 'Price'){
      return this.formGroup.controls['Price'].hasError(error);
    }else if(formControlName === 'StartPointId'){
      return this.formGroup.controls['StartPointId'].hasError(error);
    }else if(formControlName === 'CityId'){
      return this.formGroup.controls['CityId'].hasError(error);
    }else if(formControlName === 'Time'){
      return this.formGroup.controls['Time'].hasError(error);
    }
    else if(formControlName === 'Date'){
      return this.formGroup.controls['Date'].hasError(error);
    }
    return false;
  }
}
