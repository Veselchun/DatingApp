import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  // getUsers(){
  //   this.http.get("https://localhost:5001/api/users").subscribe(response => {
  //     this.users = response;
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  // getUsers(){
  //   this.http.get("https://localhost:5001/api/users").subscribe(users => this.users = users);
  // }

  registerToggle () {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean){
    this.registerMode = event;
  }

}
