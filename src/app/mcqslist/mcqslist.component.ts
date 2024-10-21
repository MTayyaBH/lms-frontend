import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mcqslist',
  templateUrl: './mcqslist.component.html',
  styleUrls: ['./mcqslist.component.css']
})
export class McqslistComponent implements OnInit ,AfterViewInit{
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
    this.route.queryParams.subscribe(params => {
      this.classuid = params['ClassName'];
      this.getdata()
    });
  }
  ngAfterViewInit(): void {
    if (typeof window.runDragScroll === 'function') {
      window.runDragScroll();
    }
  }
  getdata() {
    this.loadingMore = true
    try {
      this.http.post('lms-mcqs/byid', {id:this.classuid}).subscribe((res: any) => {
        this.data = res
        this.list = res;
        console.log(res);
        this.loadingMore = false
      })
    } catch (error) {
      console.log(error);
      this.loadingMore = false
    }
  }
  
  searchChapter: string = ''
  searchStatement: string = ''
  search() {
    const searchstatement = this.searchStatement?.toLowerCase();
    const searchchapter = this.searchChapter?.toLowerCase();
    this.list = this.data.filter(s =>
      (!this.searchStatement || s.statement.toLowerCase().includes(searchstatement.toLowerCase())) &&
      (!this.searchChapter || s.chaptername?.toLowerCase().includes(searchchapter.toLowerCase()))
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
    this.router.navigate(['/Admin/EditMCQs'], { queryParams: { UID: uid, Path: path } });
  }

  popconfirm(uid: any) {
    try {
      this.http.delete('lms-mcqs', uid).subscribe((res) => {
        if (res) {
          this.msg.success('Deleted Successfully')
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
}
