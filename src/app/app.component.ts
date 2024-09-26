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
    // const tableElements = this.el.nativeElement.querySelectorAll('.nztable .ant-table-container');
    // tableElements.forEach((element: HTMLElement) => {
    //   this.renderer.listen(element, 'mousedown', (event: MouseEvent) => {
    //     const dragScroll = new DragScrollDirective(new ElementRef(element), this.renderer);
    //     dragScroll.onMouseDown(event);
    //   });
    //   this.renderer.listen(element, 'mouseup', (event: MouseEvent) => {
    //     const dragScroll = new DragScrollDirective(new ElementRef(element), this.renderer);
    //     dragScroll.onMouseUp();
    //   });
    //   this.renderer.listen(element, 'mousemove', (event: MouseEvent) => {
    //     const dragScroll = new DragScrollDirective(new ElementRef(element), this.renderer);
    //     dragScroll.onMouseMove(event);
    //   });
    // });
  }
  isLoginPage: boolean = false
  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoginPage = this.router.url.includes('/Login') ? true : false
      if (!this.isLoginPage) {
        this.isLoginPage = this.router.url.includes('/SignUp') ? true : false
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }

}
