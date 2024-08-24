import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-adminmcqs',
  templateUrl: './adminmcqs.component.html',
  styleUrls: ['./adminmcqs.component.css']
})
export class AdminmcqsComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dbservice: DbServiceService
  ) {
    this.form = this.fb.group({
      statement: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required],
      trueoption: ['', Validators.required],
      type: ['', Validators.required],
      classname: ['', Validators.required],
      bookname: ['', Validators.required],
      unit: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.getdata()
  }
  istrueoptionvalid: any = {}
  inputsize: any = 'large'
  onSubmit() {
    if (this.form.valid) {
      const { trueoption, option1, option2, option3, option4 } = this.istrueoptionvalid;
      const validOptions = [option1, option2, option3, option4];
      if (validOptions.includes(trueoption)) {
        console.log(this.form.value);
        this.dbservice.post('lms-mcqs', this.form.value).subscribe((res: any) => {
          console.log(res);
          if (res.submit) {
            this.dbservice.createMessage('success', 'Data Submit Success Full')
            this.form.reset()
          }
        })
      } else {
        console.log('trueoption is invalid');
        this.dbservice.createMessage('error', 'True Option invalid')
      }
    } else {
      console.log('Form is invalid');
      this.dbservice.createMessage('error', 'Some expansion has been occurred')
    }
  }
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
  chapterids={

  }
  getchapters(id: any): void {
    let  chapterids={
      ClassName :this.bookid,
      BookName :id
    }
    this.dbservice.getallwithdata('chapters/books', chapterids)
      .subscribe({
        next: (res: any) => {
          if (res && res['0'] && res['0'].chapters) {
            this.Chapters = res['0'].chapters;
            console.log(this.Chapters);
          } else {
            console.log(res)
            this.Chapters=res
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
}
