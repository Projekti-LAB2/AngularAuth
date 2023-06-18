import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { StartPointService } from 'src/app/services/startPoint.service';
import { CreateStartPointComponent } from './create-start-point/create-start-point.component';
import { StartPoint } from 'src/app/models/startPoint';
import { MatSort, MatSortHeader } from '@angular/material/sort';

@Component({
  selector: 'app-start-point',
  templateUrl: './start-point.component.html',
  styleUrls: ['./start-point.component.css']
})
export class StartPointComponent {

  startPoints = new BehaviorSubject<StartPoint[]>([]);
  displayedColumns = ['StartPointId','DeparatureCityName', 'edit','delete'];
  countNumber = 0;
  columnData: string = '';
  allStartPointValues: StartPoint[] = [];
  searchText: string = '';

  constructor(private matDialog: MatDialog,private startPointService: StartPointService) { }

  ngOnInit(): void {
    this.startPointService.getStartPoints().subscribe(res => {
      this.startPoints.next(res);
      this.allStartPointValues = res;
    });
  }


  AddStartPoint() {
    const dialog = this.matDialog.open(CreateStartPointComponent, {
      width: `90%`,
    })
    dialog.afterClosed().subscribe((res:any) => {
      if(res){
        this.startPointService.createStartPoint(res).subscribe(res => {
          this.startPoints.value.push(res);
          this.startPoints.next(this.startPoints.value)
      });
      }
    })
  }
  deleteStartPoint(id:string) {
    this.startPointService.deleteStartPoint(id).subscribe(() => {
      const index = this.startPoints.value.findIndex(user => user.StartPointId?.toString() === id.toString());
        if(index !== -1) {
          this.startPoints.value.splice(index,1);
          this.startPoints.next(this.startPoints.value);
        }
    })
  }
  editStartPoint(startPoint:StartPoint) {
    const dialog = this.matDialog.open(CreateStartPointComponent, {
      width: `90%`,
      data: {startPoint: startPoint, isEditMode:true}
    })
    dialog.afterClosed().subscribe((res:any) => {
      if(res){
        this.startPointService.updateStartPoint(startPoint.StartPointId!.toString(),res).subscribe(res => {
          const index = this.startPoints.value.findIndex(user => user.StartPointId === res.StartPointId);
          if(index !== -1){
            this.startPoints.value.splice(index,1,res);
            this.startPoints.next(this.startPoints.value);
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
      this.startPoints.value.sort((a:any,b:any) => (a[column] < b[column]) === true ? -1 : (
        (a[column] === b[column]) === true ? 0 : 1));
        this.startPoints.next(this.startPoints.value);
    }else if(this.countNumber === 2){
      this.columnData = column;

      this.startPoints.value.sort((a:any,b:any) => (a[column] < b[column]) === true ? -1 : (
        (a[column] === b[column]) === true ? 0 : 1)).reverse();
        this.startPoints.next(this.startPoints.value);

    }else{
      this.countNumber = 0;
    }
  }
  filterCities() {
    const filteredValues = this.allStartPointValues.filter(startPoint => 
      startPoint.DeparatureCityName.toString().toLowerCase().includes(this.searchText.toString().toLowerCase()));
    this.startPoints.next(filteredValues)
  }
}
