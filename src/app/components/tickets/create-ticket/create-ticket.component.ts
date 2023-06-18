import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css']
})
export class CreateTicketComponent {
   a:number = 0;
  formGroup = new FormGroup({
    TicketNumber: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    Price: new FormControl(this.a,[Validators.required, Validators.minLength(1)]),
    StartPointId: new FormControl(this.a, [Validators.required, Validators.email]),
    CityId: new FormControl(this.a,[Validators.required, Validators.minLength(1)]),
    Time: new FormControl(``,[Validators.required]),
    Date: new FormControl(``,[Validators.required]),
  })

  constructor(
    public dialogRef: MatDialogRef<CreateTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {ticket: Ticket, isEditMode: boolean},
  ) {}
  ngOnInit(): void {
    if(this.data.isEditMode){
      this.formGroup.patchValue({
        TicketNumber: this.data.ticket.ticketNumber,
        Price: this.data.ticket.price,
        StartPointId: this.data.ticket.startPointId,
        CityId: this.data.ticket.cityId,
        Time: this.data.ticket.time,
        Date: this.data.ticket.date,
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
