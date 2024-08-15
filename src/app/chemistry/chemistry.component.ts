import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbServiceService } from '../db-service.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-chemistry',
  templateUrl: './chemistry.component.html',
  styleUrls: ['./chemistry.component.css']
})
export class ChemistryComponent implements OnInit {
  constructor(
    private router: Router,
    private dbservice: DbServiceService,
    private route: ActivatedRoute
  ) { }
  classname: any = 'class'
  bookname: any = 'bookname'
  chapters: any
  paremsData: any = {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.paremsData.ClassName = params['ClassName'];
      this.paremsData.BookName = params['BookName'];
      console.log(this.paremsData);
      this.getData()
    });
  }
  imageurl: any = ''
  getData() {
    try {
      this.dbservice.getallwithdata('chapters/books', this.paremsData).subscribe((res: any) => {
        this.classname = res['0'].classname;
        this.bookname = res['0'].book_name;
        this.chapters = res['0'].chapters;
        this.imageurl = res['0'].image_url;
        console.log(this.chapters);

      })
    } catch (error) {
      console.log(error);

    }
  }
  getChapterRows() {
    const rows = [];
    for (let i = 0; i < this.chapters?.length; i += 2) {
      rows.push({
        chapters: this.chapters.slice(i, i + 2)
      });
    }
    return rows;
  }
  getChapterNumber(rowIndex: number, colIndex: number): number {
    return (rowIndex * 2) + (colIndex + 1);
  }
  navigateToTest(uid: string) {
    // const data = this.dbservice.encrypt(type,'112233')
    this.router.navigate(['/LMS/OnlineTest/ClassName/BookName/Type'], { queryParams: { ClassName: this.paremsData.ClassName, BookName: this.paremsData.BookName, TestType: uid } });
    console.log(uid);

  }

}
