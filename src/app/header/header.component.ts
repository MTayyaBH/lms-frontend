import { Component, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  ngOnInit(): void {
    // this.toggleDarkMode()
  }
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  // toggleDarkMode() {
  //   const elements = document.getElementsByClassName('ant-drawer-header');
  //   for (let i = 0; i < elements.length; i++) {
  //     const element = elements[i];
  //       element.classList.add('dark:!bg-slate-800');
  //   }
  // }
  
}
