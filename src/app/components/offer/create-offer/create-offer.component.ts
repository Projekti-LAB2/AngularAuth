import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { City } from 'src/app/models/City';
import Offer from 'src/app/models/offer';

@Component({
  selector: 'app-create-offer',
  templateUrl: './create-offer.component.html',
  styleUrls: ['./create-offer.component.css']
})
export class CreateOfferComponent {
  cities: City[] = [];

  datav:any = undefined;
  formGroup = new FormGroup({
    OfferName: new FormControl(``,[Validators.required, Validators.minLength(1)]),
    CityId: new FormControl(this.datav, [Validators.required, Validators.email]),
    OfferDescription: new FormControl(this.datav,[Validators.required, Validators.minLength(1)]),
    Price: new FormControl(``,[Validators.required]),
  })

  constructor(
    public dialogRef: MatDialogRef<CreateOfferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {offer: Offer, isEditMode: boolean, 
                                                cities: City[]},
  ) {}
  ngOnInit(): void {
    this.cities = this.data.cities;

    if(this.data?.isEditMode){
      this.formGroup.patchValue({
        OfferName: this.data.offer.OfferName,
        CityId: this.data.offer.CityId.toString(),
        OfferDescription: this.data.offer.OfferDescription,
        Price: this.data.offer.Price.toString(),
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
    if(formControlName === 'OfferName'){
      return this.formGroup.controls['OfferName'].hasError(error);
    }else if(formControlName === 'Price'){
      return this.formGroup.controls['Price'].hasError(error);
    }else if(formControlName === 'OfferDescription'){
      return this.formGroup.controls['OfferDescription'].hasError(error);
    }else if(formControlName === 'CityId'){
      return this.formGroup.controls['CityId'].hasError(error);
    }
    return false;
  }
}
