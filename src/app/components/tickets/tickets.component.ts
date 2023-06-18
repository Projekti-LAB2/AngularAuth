import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/ticket.service';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  constructor(private ticketService: TicketService,private matDialog: MatDialog) { }

  ngOnInit(): void {
  }
  AddTicket() {
    const dialog = this.matDialog.open(CreateTicketComponent, {
      width: `90%`,
    })
    dialog.afterClosed().subscribe((res:any) => {
      this.ticketService.createTicket(res).subscribe(res => {
        console.log(res,'----00');
        
        // const index = this.users.findIndex(user => user.id === res.id);
        // this.users.splice(index,1,res);
      });
    })
  }
}
 