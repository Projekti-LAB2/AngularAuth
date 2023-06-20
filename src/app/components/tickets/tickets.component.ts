import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/ticket.service';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { Ticket } from 'src/app/models/ticket';
import { BehaviorSubject } from 'rxjs';
import { CityService } from 'src/app/services/cities.service';
import { City } from 'src/app/models/City';
import { StartPointService } from 'src/app/services/startPoint.service';
import { StartPoint } from 'src/app/models/startPoint';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  tickets = new BehaviorSubject<Ticket[]>([]);
  cities: City[] = [];
  startPoints: StartPoint[] = [];
  displayedColumns = [
    'TicketId',
    'TicketNumber',
    'Price',
    'StartPoint',
    'City',
    'Time',
    'Date',
    'edit',
    'delete',
  ];
  options = [
    'TicketId',
    'TicketNumber',
    'Price',
    'StartPoint',
    'City',
    'Time',
    'Date',
  ];

  countNumber = 0;
  columnData: string = '';
  allTicketValues: Ticket[] = [];
  searchText: string = '';

  constructor(
    private ticketService: TicketService,
    private matDialog: MatDialog,
    private cityService: CityService,
    private startPointService: StartPointService
  ) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe((res) => {
      this.tickets.next(res);
      this.allTicketValues = res;
    });
    this.cityService.getCities().subscribe((res) => {
      this.cities = res;
    });
    this.startPointService.getStartPoints().subscribe((res) => {
      this.startPoints = res;
    });
  }

  AddTicket() {
    const dialog = this.matDialog.open(CreateTicketComponent, {
      width: `90%`,
      data: { cities: this.cities, startPoints: this.startPoints },
    });
    dialog.afterClosed().subscribe((res: any) => {
      this.ticketService.createTicket(res).subscribe((res) => {
        this.tickets.value.push(res);
        this.tickets.next(this.tickets.value);
      });
    });
  }
  deleteTicket(id: string) {
    this.ticketService.deleteTicket(id).subscribe(() => {
      const index = this.tickets.value.findIndex(
        (user) => user.TicketId.toString() === id.toString()
      );
      if (index !== -1) {
        this.tickets.value.splice(index, 1);
        this.tickets.next(this.tickets.value);
      }
    });
  }
  editTicket(ticket: Ticket) {
    const dialog = this.matDialog.open(CreateTicketComponent, {
      width: `90%`,
      data: {
        ticket: ticket,
        isEditMode: true,
        cities: this.cities,
        startPoints: this.startPoints,
      },
    });
    dialog.afterClosed().subscribe((res: any) => {
      this.ticketService
        .updateTicket(ticket.TicketId.toString(), res)
        .subscribe((res) => {
          const index = this.tickets.value.findIndex(
            (user) => user.TicketId === res.TicketId
          );
          if (index !== -1) {
            this.tickets.value.splice(index, 1, res);
            this.tickets.next(this.tickets.value);
          }
        });
    });
  }
  getStartPoint(id: number | null) {
    return id !== null
      ? this.startPoints.find(
          (item) => item.StartPointId?.toString() === id.toString()
        )?.DeparatureCityName
      : '';
  }

  sort(column: any) {
    this.countNumber++;
    if (this.columnData !== column) {
      this.columnData = column;
      this.countNumber = 1;
    }
    if (this.countNumber === 1) {
      this.columnData = column;
      this.tickets.value.sort((a: any, b: any) =>
        a[column] < b[column] === true
          ? -1
          : (a[column] === b[column]) === true
          ? 0
          : 1
      );
      this.tickets.next(this.tickets.value);
    } else if (this.countNumber === 2) {
      this.columnData = column;

      this.tickets.value
        .sort((a: any, b: any) =>
          a[column] < b[column] === true
            ? -1
            : (a[column] === b[column]) === true
            ? 0
            : 1
        )
        .reverse();
      this.tickets.next(this.tickets.value);
    } else {
      this.countNumber = 0;
    }
  }
  filterCities() {
    if (this.filterByColumn) {
      const filteredValues = this.allTicketValues.filter((ticket) =>
      {const ticketData = this.filterByColumn === 'City' ?
          (ticket[this.filterByColumn as keyof Ticket] as City).CityName : (
            this.filterByColumn === 'StartPoint' ? 
              (ticket[this.filterByColumn as keyof Ticket] as StartPoint)?.DeparatureCityName : ticket[this.filterByColumn as keyof Ticket])
        return ticketData.toString().toLowerCase().includes(this.searchText.toString().toLowerCase())}
      );
      this.tickets.next(filteredValues);
    } else {
      const filteredValues = this.allTicketValues.filter((ticket) =>
        ticket.TicketId.toString()
          .toLowerCase()
          .includes(this.searchText.toString().toLowerCase())
      );
      this.tickets.next(filteredValues);
    }
  }
  filterByColumn: string = '';
  changeValue(option: string) {
    this.filterByColumn = option;
  }
}
 