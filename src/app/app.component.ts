import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isCollapsed = false;
  constructor(private router: Router) { }
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
  }
}
