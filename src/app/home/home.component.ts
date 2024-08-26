import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewChecked {
  constructor(private sharedService: DbServiceService) {}
  userdata: any = localStorage.getItem('userdata');
  login: boolean = false;

  ngOnInit() {
    this.userdata ? this.login = true : this.login = false;
    AOS.init({
      offset: 120,
      delay: 0,
      duration: 2000,
      easing: 'ease',
      once: false, 
      mirror: false, 
    });
  }

  onClick() {
    this.sharedService.triggerNotify();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      AOS.refresh();
    }, 0);
  }
  ngAfterViewChecked(): void {
    AOS.refresh();
  }
}
