import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userdata: any = localStorage.getItem('userdata')
  login: boolean = false
  ngOnInit() {
    this.userdata ? this.login = true : this.login = false
  }


}
