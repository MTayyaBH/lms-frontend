import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-adminmcqs',
  templateUrl: './adminmcqs.component.html',
  styleUrls: ['./adminmcqs.component.css']
})
export class AdminmcqsComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dbservice: DbServiceService,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private router: Router
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
  pathtoupdaterouter: any
  routerclassuid:any
  updateuid: any
  editMode: boolean = false
  checkEditMode(): void {
    const uid = this.route.snapshot.queryParamMap.get('UID');
    const path = this.route.snapshot.queryParamMap.get('Path');
    const urlContainsEditMCQs = this.route.snapshot.url.some(segment => segment.path.includes('EditMCQs'));
    if (urlContainsEditMCQs && uid && path) {
      this.pathtoupdaterouter = this.dbservice.decrypt(path, 'path')
      console.log(this.pathtoupdaterouter);
      const urlParams = new URLSearchParams(this.pathtoupdaterouter.split('?')[1]);
      this.routerclassuid = urlParams.get('ClassName');
      this.updateuid = uid
      this.dbservice.post('lms-mcqs/mcqs/byid', {id:uid}).subscribe(
        (res: any) => {
          if (res && res?.length > 0) {
            this.form.patchValue(res[0]);
            this.editMode = true;
          } else {
            console.error('No data found for the provided UID');
          }
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
    }
  }
  istrueoptionvalid: any = {}
  inputsize: any = 'large'
  onSubmit() {
    if (this.form.valid) {
      const { trueoption, option1, option2, option3, option4 } = this.istrueoptionvalid;
      const validOptions = [option1, option2, option3, option4];
      if (validOptions.includes(trueoption)) {
        if (!this.editMode) {
          this.dbservice.post('lms-mcqs', this.form.value).subscribe((res: any) => {
            console.log(res);
            if (res.submit) {
              this.dbservice.createMessage('success', 'Data Submit Success Full')
              this.form.reset()
            }
          })
        } else {
          try {
            this.dbservice.updatebyid('lms-mcqs', this.updateuid, this.form.value).subscribe((res) => {
              if (res) {
                console.log(res);
                this.msg.success('Update Successfully')
                this.form.reset();
                this.router.navigate(['/Admin/MCQsList'], { queryParams: { ClassName: this.routerclassuid } });
              }
            })
          } catch (error) {
            console.log(error);
            this.msg.error('Some expansion has been occurred')
          }

        }
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
    let data={}
    try {
      this.dbservice.post('classes/getclasses',data).subscribe((res: any) => {
        console.log(res);
        this.checkEditMode()
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
      this.dbservice.post('books/getbyid', {id}).subscribe((res) => {
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
    this.dbservice.post('chapters/books/getbydata', chapterids)
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
}
