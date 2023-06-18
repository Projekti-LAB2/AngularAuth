import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { City } from 'src/app/models/City';
import { CityService } from 'src/app/services/cities.service';
import { StartPointService } from 'src/app/services/startPoint.service';
import { CreateCitiesComponent } from './create-cities/create-cities.component';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities = new BehaviorSubject<City[]>([]);
  displayedColumns = ['CityId','CityName', 'edit','delete'];

  countNumber = 0;
  columnData: string = '';
  searchText: string = '';

  allCitiesValues: City[] = [];

  constructor(private matDialog: MatDialog,
    private cityService: CityService, private startPointService: StartPointService) { }

  ngOnInit(): void {
    this.cityService.getCities().subscribe(res => {
      this.cities.next(res);
      this.allCitiesValues = res;
    });
  }


  AddCity() {
    const dialog = this.matDialog.open(CreateCitiesComponent, {
      width: `90%`,
    })
    dialog.afterClosed().subscribe((res:any) => {
      if(res){
        this.cityService.createCity(res).subscribe(res => {
          this.cities.value.push(res);
          this.cities.next(this.cities.value)
      });
      }
    })
  }
  deleteCity(id:string) {
    this.cityService.deleteCity(id).subscribe(() => {
      const index = this.cities.value.findIndex(user => user.CityId.toString() === id.toString());
        if(index !== -1) {
          this.cities.value.splice(index,1);
          this.cities.next(this.cities.value);
        }
    })
  }
  editCity(city:City) {
    const dialog = this.matDialog.open(CreateCitiesComponent, {
      width: `90%`,
      data: {city: city, isEditMode:true}
    })
    dialog.afterClosed().subscribe((res:any) => {
      if(res){
        this.cityService.updateCity(city.CityId.toString(),res).subscribe(res => {
          const index = this.cities.value.findIndex(user => user.CityId === res.CityId);
          if(index !== -1){
            this.cities.value.splice(index,1,res);
            this.cities.next(this.cities.value);
          }
        });
      }
    })
  }
  sort(column:any) {
    this.countNumber++;
    if(this.columnData !== column) {
      this.columnData = column;
      this.countNumber = 1;
    }
    if(this.countNumber === 1) {
      this.columnData = column;
      this.cities.value.sort((a:any,b:any) => (a[column] < b[column]) === true ? -1 : (
        (a[column] === b[column]) === true ? 0 : 1));
        this.cities.next(this.cities.value);
    }else if(this.countNumber === 2){
      this.columnData = column;

      this.cities.value.sort((a:any,b:any) => (a[column] < b[column]) === true ? -1 : (
        (a[column] === b[column]) === true ? 0 : 1)).reverse();
        this.cities.next(this.cities.value);

    }else{
      this.countNumber = 0;
    }
  }
  filterCities() {
    const filteredValues = this.allCitiesValues.filter(city => 
      city.CityName.toString().toLowerCase().includes(this.searchText.toString().toLowerCase()));
    this.cities.next(filteredValues)
  }
}
