import { Component, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private sharedService: DbServiceService) {}
  placement: NzDrawerPlacement = 'left';
  ngOnInit() {
    this.sharedService.notify.subscribe(() => {
      this.someFunction();
    });
  }
  visible = false;
  visiblel=false
  openl(){
    this.visiblel=true
  }
  closel(){
    this.visiblel=false
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  someFunction() {
    console.log('Function in second component called!');
  }
}
