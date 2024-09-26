import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-chapterslist',
  templateUrl: './chapterslist.component.html',
  styleUrls: ['./chapterslist.component.css']
})
export class ChapterslistComponent implements OnInit ,AfterViewInit{
  initLoading = true;
  loadingMore = false;
  data1: any[] = [];
  list: any[] = [];
  classuid: any;
  classname: any;
  bookname: any;
  chapters: any[] = [];
  imageurl: any;
  datauid: any
  constructor(
    private http: DbServiceService,
    private msg: NzMessageService,
    private route: ActivatedRoute
  ) { }
  visible: boolean = false
  visibleclass: boolean = false
  visiblebook: boolean = false
  searchValue = '';
  paremsData: any = {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paremsData.ClassName = params['ClassName'];
      this.paremsData.BookName = params['BookName'];
      console.log(this.paremsData);
      this.getData()
    });
  }
  ngAfterViewInit(): void {
    if (typeof window.runDragScroll === 'function') {
      window.runDragScroll();
    }
  }
  getData() {
    this.loadingMore = true
    try {
      this.http.getallwithdata('chapters/books', this.paremsData).subscribe((res: any) => {
        if (res) {
          this.data1 = res
          this.loadingMore = false
          if (Array.isArray(res) && res.length === 0) {
            this.chapters = []
          } else {
            this.classname = res['0'].classname;
            this.bookname = res['0'].book_name;
            this.chapters = res['0'].chapters;
            this.imageurl = res['0'].image_url;
            this.datauid = res['0'].uid;
          }
          console.log(res);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  searchStatement: string = ''
  search() {
    const searchstatement = this.searchStatement?.toLowerCase();
    this.chapters = this.data1['0'].chapters.filter((s: { title: any; }) =>
      (!this.searchStatement || s.title.toLowerCase().includes(searchstatement.toLowerCase()))
    );
  }
  popconfirm(uid: any) {
    const chapter = this.chapters.filter((a: { uid: any; }) => a.uid !== uid)
    try {
      this.http.updatebyid('chapters', this.datauid, chapter).subscribe((res: any) => {
        if (res) {
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
  extractNumber(classname: string): number | null {
    const match = classname.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }
  originalData: any = {};
  editRow(row: any) {
    this.originalData[row.uid] = { ...row };
    row.editable = true;

  }
  saveRow(row: any) {
    row.editable = false;
    console.log('Data saved:', row);
    const index = this.chapters.findIndex((a: { uid: any; }) => a.uid === row.uid)
    console.log(index);
    this.chapters[index] = { uid: row.uid, content: row.content, title: row.title }
    console.log(this.chapters);
    try {
      this.http.updatebyid('chapters', this.datauid,this.chapters).subscribe((res: any) => {
        if (res) {
          this.msg.success('Edit Successfully')
          this.getData()
        }
      })
    } catch (error) {
      this.msg.error('Some error founded!')
      console.log(error);
    }
  }
  cancelEdit(row: any) {
    Object.assign(row, this.originalData[row.uid]);
    row.editable = false;
    delete this.originalData[row.uid];
  }
}