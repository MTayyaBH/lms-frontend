import { Component, OnInit,  AfterViewInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private sharedService: DbServiceService) {}
  userdata: any = localStorage.getItem('userdata');
  login: boolean = false;

  ngOnInit() {
    this.sharedService.notify.subscribe(() => {
      this.checklogin();
    });
    this.checklogin()
    
  }
  checklogin(){
    const data=localStorage.getItem('userdata');
    data ? this.login = true : this.login = false;
  }
  
}
