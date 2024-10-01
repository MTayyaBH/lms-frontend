import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DragScrollDirective } from './drag-scroll.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  isCollapsed = false;
  constructor(private router: Router, private viewportScroller: ViewportScroller, private el: ElementRef, private renderer: Renderer2) { }
  ngAfterViewInit(): void {

  }
  isLoginPage: boolean = false
  isadmin:boolean=false
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoginPage = this.router.url.includes('/Login') ? true : false
      if (!this.isLoginPage) {
        this.isLoginPage = this.router.url.includes('/SignUp') ? true : false
      }
      this.isadmin=this.router.url.includes('/Admin') ? true : false
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

}
