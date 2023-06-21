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
    Image: new FormControl(this.datav,[Validators.required]),
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
        Image: this.data.offer.Image,
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
  onFileSelected(event:any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        // `reader.result` contains the base64 representation of the file
        const base64Image = reader.result;
        this.formGroup.controls['Image'].setValue(base64Image);
        console.log(base64Image,'base64Image');
        
        // Do something with the base64Image, such as sending it to an API or displaying it on the page
        console.log(base64Image);
      };
  
      reader.readAsDataURL(file);
    }
  }
}
