
import { Component, ElementRef, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-allresults',
  templateUrl: './allresults.component.html',
  styleUrls: ['./allresults.component.css']
})
export class AllresultsComponent implements OnInit,AfterViewInit{
  initLoading = true; 
  loadingMore = false;
  data: any[] = [];
  list: any[] = [];
  constructor(
    private http: DbServiceService,
    private msg: NzMessageService,
    private el: ElementRef
  ) { }
  ngAfterViewInit(): void {
    if (typeof window.runDragScroll === 'function') {
      window.runDragScroll();
    }
  }
  visible: boolean = false
  visibleclass: boolean = false
  visiblebook: boolean = false
  searchValue = '';
  ngOnInit(): void {
    this.getdata()
  }
  getdata() {
    this.loadingMore = true
    try {
      this.http.get('result').subscribe((res: any) => {
        this.data=res
        this.list = res;
        console.log(res);
        this.loadingMore = false
      })
    } catch (error) {
      console.log(error);
      this.loadingMore = false
    }
  }
  searchClass:string=''
  searchBook:string=''
  searchName:string=''
  search() {
    const searchname = this.searchName?.toLowerCase(); 
    const searchclass = this.searchClass?.toLowerCase(); 
    const searchbook = this.searchBook?.toLowerCase(); 
    this.list = this.data.filter(s => 
      (!this.searchName || s.email.toLowerCase().includes(searchname.toLowerCase())||s.name.toLowerCase().includes(searchname)) &&
      (!this.searchClass || s.classname.toLowerCase().includes(searchclass.toLowerCase())) &&
      (!this.searchBook || s.book_name.toLowerCase().includes(searchbook.toLowerCase()))
    );
  }
  sortByName() {
    this.list.sort((a: { itemName: string; }, b: { itemName: any; }) => {
      return a.itemName.localeCompare(b.itemName);
    });
  }
}
