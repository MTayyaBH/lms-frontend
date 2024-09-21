import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { DbServiceService } from '../db-service.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})

export class ChaptersComponent implements OnInit {
  bookForm: any;
  clases: any; // Example classes

  constructor(
    private fb: FormBuilder, 
    private http: DbServiceService, 
    private msg: NzMessageService
  ) { }

  ngOnInit() {
    this.bookForm = this.fb.group({
      bookName: ['', [Validators.required]],
      ClassName: ['', [Validators.required]],
      chapters: this.fb.array([]),
      description: ['']
    });
    this.getdataClasses();
  }

  get chapters() {
    return this.bookForm.get('chapters') as FormArray;
  }

  addChapter() {
    const chapter = this.fb.group({
      uid: [uuidv4()],
      title: ['', [Validators.required]],
      content: ['']
    });
    this.chapters.push(chapter);
  }

  removeChapter(index: number) {
    this.chapters.removeAt(index);
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.msg.error('Please fill in the required fields');
      this.bookForm.markAllAsTouched(); 
      return;
    }

    try {
      this.http.post('chapters', this.bookForm.value).subscribe((res) => {
        console.log(res);
        if (res) {
          this.msg.success('Data Submitted Successfully');
          this.bookForm.reset();
        }
      });
    } catch (error) {
      console.log(error);
      this.msg.error('Some error occurred');
    }
  }

  getdataClasses() {
    try {
      this.http.get('classes').subscribe((res: any) => {
        console.log(res);
        this.clases = this.sortClasses(res);
      });
    } catch (error) {
      console.log(error);
    }
  }

  sortClasses(classes: any) {
    return classes.sort((a: { classname: string }, b: { classname: string }) => {
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

  books: any;
  getbooks(id: any) {
    try {
      this.http.getbyid('books', id).subscribe((res) => {
        console.log(res);
        this.books = res;
      });
    } catch (error) {
      console.log(error);
    }
  }
}
