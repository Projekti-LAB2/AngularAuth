import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from 'src/app/models/user';
import { APIService } from 'src/app/services/api.service';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: APIService, private matDialog: MatDialog) { }
  // constructor(private userService: APIService) { }

  users: User[] = [];
  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      console.log(res,'res');
      
      this.users = res;
    });
  }
  deleteUser(id:string | undefined) {
    if(id){
      this.userService.deleteUser(id).subscribe(() => {
        const index = this.users.findIndex(user => user.id === id);
        this.users.splice(index,1);
      })
    }
  }
  editUser(user:User) {
    const dialog = this.matDialog.open(EditUserComponent, {
      width: `80%`,
      data: {user:user}
    })
    dialog.afterClosed().subscribe(res => {

    })
  }
}
