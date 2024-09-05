import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Output() dataChanged: EventEmitter<string> = new EventEmitter<string>();
  isCollapsed: boolean = false
  colspan: boolean = false
  colbtn() {
    this.sendDataToParent(this.isCollapsed)
  }
  sendDataToParent(data: any): void {
    this.dataChanged.emit(data);
  }
  constructor(
    private sharedService: DbServiceService,
    private router: Router
  ) { }
  theme: any = 'light'
  ngOnInit(): void {
    this.sharedService.notify.subscribe(() => {
      this.themechange();
    });
    this.themechange()
    this.getdata();
    this.checkScreenSize();
  }
  themechange() {
    const storedTheme = localStorage.getItem('theme');
    this.theme = storedTheme ? storedTheme : 'light';
  }
  classes: any
  getdata() {
    try {
      this.sharedService.get('classes').subscribe((res: any) => {
        console.log(res);
        this.classes = this.sortClasses(res)
      })
    } catch (error) {
      console.log(error);

    }
  }
  sortClasses(classes: any) {
    return classes.sort((a: { classname: string; }, b: { classname: string; }) => {
      const numA = this.extractNumber(a.classname);
      const numB = this.extractNumber(b.classname);
      if (numA === null && numB === null) return 0;
      if (numA === null) return 1;
      if (numB === null) return -1;
      return numA - numB;
    });
  }
  extractNumber(classname: string): number | null {
    const match = classname.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }
  isScreenMdOrGreater: boolean = false
  checkScreenSize(): void {
    const screenWidth = window.innerWidth;
    this.isScreenMdOrGreater = screenWidth <= 768;
    this.isCollapsed = this.isScreenMdOrGreater;
  }
  navegater(uid: string) {
    this.router.navigate(['/Admin/MCQsList'], { queryParams: { ClassName: uid } });
    console.log(uid);
  }
}
