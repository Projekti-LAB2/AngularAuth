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
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets = new BehaviorSubject<Ticket[]>([]);
  cities: City[] = [];
  startPoints: StartPoint[] = [];
  displayedColumns = ['TicketId','TicketNumber','Price','StartPoint','City','Time','Date', 'edit','delete'];

  constructor(private ticketService: TicketService,private matDialog: MatDialog,
    private cityService: CityService, private startPointService: StartPointService) { }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(res => {
      this.tickets.next(res);
    });
    this.cityService.getCities().subscribe(res => {
      this.cities = res;
    });
    this.startPointService.getStartPoints().subscribe(res => {
      this.startPoints = res;
    });
  }


  AddTicket() {
    const dialog = this.matDialog.open(CreateTicketComponent, {
      width: `90%`,
      data: {cities: this.cities, startPoints: this.startPoints}
    })
    dialog.afterClosed().subscribe((res:any) => {
      this.ticketService.createTicket(res).subscribe(res => {
          this.tickets.value.push(res);
          this.tickets.next(this.tickets.value)
      });
    })
  }
  deleteTicket(id:string) {
    this.ticketService.deleteTicket(id).subscribe(() => {
      const index = this.tickets.value.findIndex(user => user.TicketId.toString() === id.toString());
        if(index !== -1) {
          this.tickets.value.splice(index,1);
          this.tickets.next(this.tickets.value);
        }
    })
  }
  editTicket(ticket:Ticket) {
    const dialog = this.matDialog.open(CreateTicketComponent, {
      width: `90%`,
      data: {ticket: ticket, isEditMode:true, cities: this.cities, startPoints: this.startPoints}
    })
    dialog.afterClosed().subscribe((res:any) => {
      this.ticketService.updateTicket(ticket.TicketId.toString(),res).subscribe(res => {
        const index = this.tickets.value.findIndex(user => user.TicketId === res.TicketId);
        if(index !== -1){
          this.tickets.value.splice(index,1,res);
          this.tickets.next(this.tickets.value);
        }
      });
    })
  }
}
 