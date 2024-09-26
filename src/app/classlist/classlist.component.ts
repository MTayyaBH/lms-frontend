import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html',
  styleUrls: ['./classlist.component.css']
})
export class ClasslistComponent implements OnInit,AfterViewInit{
  initLoading = true;
  loadingMore = false;
  data: any[] = [];
  list: any[] = [];
  classuid: any;
  constructor(
    private http: DbServiceService,
    private msg: NzMessageService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  visible: boolean = false
  visibleclass: boolean = false
  visiblebook: boolean = false
  searchValue = '';
  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.classuid = params['ClassName'];
    // });
    this.getdata()
  }
  ngAfterViewInit(): void {
    if (typeof window.runDragScroll === 'function') {
      window.runDragScroll();
    }
  }
  getdata() {
    this.loadingMore = true
    try {
      this.http.get('classes').subscribe((res: any) => {
        this.data = this.sortClasses(res)
        this.list = this.sortClasses(res)
        console.log(res);
        this.loadingMore = false
      })
    } catch (error) {
      console.log(error);
      this.loadingMore = false
    }
  }
  searchStatement: string = ''
  search() {
    const searchstatement = this.searchStatement?.toLowerCase();
    this.list = this.data.filter(s =>
      (!this.searchStatement || s.classname.toLowerCase().includes(searchstatement.toLowerCase())) 
    );
  }
  sortByName() {
    this.list.sort((a: { itemName: string; }, b: { itemName: any; }) => {
      return a.itemName.localeCompare(b.itemName);
    });
  }
  editmcqs(uid: any) {
    const currentUrlWithoutDomain = window.location.pathname + window.location.search;
    const path = this.http.encrypt(currentUrlWithoutDomain, 'path')
    console.log(path);
    this.router.navigate(['/Admin/Update-Class'], { queryParams: { UID: uid, Path: path } });
  }

  popconfirm(uid: any) {
    try {
      this.http.delete('classes',uid).subscribe((res:any)=>{
       if (res.submit) {
        this.msg.success(res?.message)
        this.getdata()
       }
      })
    } catch (error) {
      this.msg.error('Some error founded!')
      console.log(error);
      
    }

  }
  popcancel() {
    this.msg.warning('Cancel Successfully')
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
}
