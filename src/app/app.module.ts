// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
// // import {  MatButtonModule, MatDialog, MatDialogModule, MatIconModule, MatInputModule } from '@angular/material';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { TokenInterceptor } from './interceptors/token.interceptor';
// import { TicketsComponent } from './components/tickets/tickets.component';
// import { CitiesComponent } from './components/cities/cities.component';
// import { OffersComponent } from './components/offers/offers.component';
// import { UsersComponent } from './components/users/users.component';
// import { EditUserComponent } from './components/users/edit-user/edit-user.component';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatSelectModule } from '@angular/material/select';
// import { MatIconModule } from '@angular/material/icon';

// // ... and so on

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent,
//     SignupComponent,
//     DashboardComponent,
//     TicketsComponent,
//     CitiesComponent,
//     OffersComponent,
//     UsersComponent,
//     EditUserComponent
//   ],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     AppRoutingModule,
//     MatFormFieldModule,
//     MatInputModule,
//     FormsModule,
//     ReactiveFormsModule,
//     MatIconModule,
//     MatButtonModule,
//     HttpClientModule,
//     MatDialogModule
//   ],
//   providers: [{
//     provide: HTTP_INTERCEPTORS,
//     useClass: TokenInterceptor,
//     multi: true
//   }],
//   bootstrap: [AppComponent],
//   // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { TicketsComponent } from './components/tickets/tickets.component';
import { CitiesComponent } from './components/cities/cities.component';
import { OffersComponent } from './components/offers/offers.component';
import { UsersComponent } from './components/users/users.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CreateTicketComponent } from './components/tickets/create-ticket/create-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    TicketsComponent,
    CitiesComponent,
    OffersComponent,
    UsersComponent,
    EditUserComponent,
    CreateTicketComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
