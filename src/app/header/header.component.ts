import { Component, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { DbServiceService } from '../db-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private sharedService: DbServiceService,
    private msg: NzMessageService,
    private router:Router
  ) { }
  placement: NzDrawerPlacement = 'left';
  ngOnInit() {
    this.sharedService.notify.subscribe(() => {
      this.someFunction();
    });
  }
  visible = false;
  visiblel = false
  openl() {
    this.visiblel = true
  }
  closel() {
    this.visiblel = false
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
  logout() {
    try {
      localStorage.clear()
      this.msg.success('Logout Successfully')
      this.closel()
      this.router.navigate(['/home'])
      this.sharedService.triggerNotify();
    } catch (error) {
      console.log(error);
      this.msg.error('error durring logout')
    }
  }
}
