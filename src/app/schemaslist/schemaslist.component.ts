import { Component, ElementRef, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { DragScrollDirective } from '../drag-scroll.directive';
declare global {
  interface Window {
    runDragScroll: () => void;
  }
}
@Component({
  selector: 'app-schemaslist',
  templateUrl: './schemaslist.component.html',
  styleUrls: ['./schemaslist.component.css']
})
export class SchemaslistComponent implements OnInit,AfterViewInit{
  initLoading = true;
  loadingMore = false;
  data: any[] = [];
  list: any[] = [];
  classuid: any;
  constructor(
    private http: DbServiceService,
    private msg: NzMessageService,
    private router: Router,
    private route: ActivatedRoute,private el: ElementRef, private renderer: Renderer2
  ) { }
  visible: boolean = false
  visible2: boolean = false
  visible3: boolean = false
  visible4: boolean = false
  visibleclass: boolean = false
  visiblebook: boolean = false
  searchValue = '';
  paremsData: any = {}
  ngOnInit() {
    // this.route.queryParams.subscribe(params => {
    //   this.paremsData.ClassName = params['ClassName'];
    //   this.paremsData.BookName = params['BookName'];
    //   console.log(this.paremsData);
      this.getData()
    // });
  }
  getData() {
    this.loadingMore = true
    try {
      this.http.get('schemas').subscribe((res: any) => {
        this.data = res
        this.list = res
        console.log(res);
        this.loadingMore = false
      })
    } catch (error) {
      console.log(error);
      this.loadingMore = false
    }
  }
  searchStatement: string = '';
  searchType: string = '';
  type: string = '';
  chapter: string = '';
  search() {
    const searchStatementLower = this.searchStatement.toLowerCase();
    const searchTypeLower = this.searchType.toLowerCase();
    const type = this.type.toLowerCase();
    const chapter = this.chapter.toLowerCase();

    this.list = this.data.filter(s =>
      (!this.searchStatement || (s.statement && s.statement.toLowerCase().includes(searchStatementLower))) &&
      (!this.searchType || (s.questiontype && s.questiontype.toLowerCase().includes(searchTypeLower))) &&
      (!this.type || (s.type && s.type.toLowerCase().includes(type))) &&
      (!this.chapter || (s.chaptername && s.chaptername.toLowerCase().includes(chapter)))
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
    this.router.navigate(['/Admin/Edit-Questions'], { queryParams: { UID: uid, Path: path } });
  }

  popconfirm(uid: any) {
    try {
      this.http.delete('questions', uid).subscribe((res: any) => {
        if (res.msg) {
          this.msg.success('Deleted Successfully')
          this.getData()
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
  ngAfterViewInit(): void {
    if (typeof window.runDragScroll === 'function') {
      window.runDragScroll();
    }
  }
}
