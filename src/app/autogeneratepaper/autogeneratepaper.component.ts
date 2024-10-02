import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import { ActivatedRoute, } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-autogeneratepaper',
  templateUrl: './autogeneratepaper.component.html',
  styleUrls: ['./autogeneratepaper.component.css']
})
export class AutogeneratepaperComponent implements OnInit, AfterViewInit {
  form: any;
  constructor(
    private fb: FormBuilder,
    private dbservice: DbServiceService,
    private route: ActivatedRoute,
    private msg: NzMessageService,
  ) {
  }
  ngOnInit() {
    this.form = this.fb.group({
      classname: [''],
      bookname: [''],
      testtype: [''],
      chapternames: [[]],
      papername: [''],
      schemaname: [''],
    });
  }

  onSubmit() {
    const formValue = this.form.value;
    switch (true) {
      case !formValue.classname:
        this.msg.error('Please select a class.');
        break;
      case !formValue.bookname:
        this.msg.error('Please select a Book.');
        break;
      case !formValue.testtype:
        this.msg.error('Please select a test type.');
        break;
      case formValue.testtype === 'Select Chapter' && !formValue.chapternames?.length:
        this.msg.error('Please select chapters.');
        break;
      case !formValue.schemaname:
        this.msg.error('Please select schema.');
        break;
      case !formValue.papername || formValue.papername?.length < 5:
        this.msg.error('Please enter correctly paper name minimum five length.');
        break;
      default:
       try {
        this.startLoading()
        this.dbservice.post('schemas/autogeneratepaper', formValue).subscribe((res) => {
          console.log(res);
          if (res) {
            this.closeLoading()
          }
        })
       } catch (error) {
        console.log(error);
        this.closeLoading()
       }
    }
  }
  loader:boolean=false
  startLoading() {
    this.loader = true
    document.getElementById('loade')?.classList.add('disabled')
  }
  closeLoading() {
    this.loader = false
    document.getElementById('loade')?.classList.remove('disabled')
  }

  ngAfterViewInit(): void {
    this.getdata();
  }

  istrueoptionvalid: any = {}
  inputsize: any = 'large'
  getdata() {
    try {
      this.dbservice.get('classes').subscribe((res: any) => {
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
  bookid: any
  getbooks(id: any) {
    console.log(id);
    this.bookid = id
    try {
      this.dbservice.getbyid('books', id).subscribe((res) => {
        console.log(res);
        this.Books = res
      })
    } catch (error) {
      console.log(error);
    }
  }
  chapterids = {

  }

  getchapters(id: any): void {
    let chapterids = {
      ClassName: this.bookid,
      BookName: id
    }
    this.dbservice.getallwithdata('chapters/books', chapterids)
      .subscribe({
        next: (res: any) => {
          if (res && res['0'] && res['0'].chapters) {
            this.Chapters = res['0'].chapters;
            console.log(this.Chapters);
          } else {
            console.log(res)
            this.Chapters = res
          }
        },
        error: (error: any) => {
          console.error('Error fetching chapters:', error);
        }
      });
  }
  classes: any = []
  Books: any = []
  Chapters: any = []

  schemas: any[] = [];

  getschemas(type: string) {
    const formValue: any = this.form.value;
    if (type === 'Full Book' && formValue.bookname && formValue.classname) {
      const data = {
        type,
        bookname: formValue.bookname,
        classname: formValue.classname
      }
      try {
        this.dbservice.getallwithdata('schemas/bydata', data).subscribe(
          (res: any) => {
            console.log(res);
            this.schemas = res;
          },
          (error: any) => {
            console.error('Error retrieving schemas:', error);
          }
        );
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    }
  }

   getSchemasWithChapters(selectedChapters: string[]): void {
    const formValue: any = this.form.value;
    const data = {
      selectedChapters,
      bookname: formValue.bookname,
      classname: formValue.classname
    }
    try {
      this.dbservice.getallwithdata('schemas/getbychapters', data).subscribe(
        (res: any) => {
          console.log(res);
          this.schemas = res;
        },
        (error: any) => {
          console.error('Error retrieving schemas:', error);
        }
      );
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }





}
