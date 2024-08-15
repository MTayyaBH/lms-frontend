import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit{
  ngOnInit() {
    this.getdata()
  }
  bookForm: FormGroup;
  selectedFile: File | null = null;
  imageUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
     private uploadService: DbServiceService,
      private msg: NzMessageService,
      private http: DbServiceService
    ) {
    this.bookForm = this.fb.group({
      bookName: ['', Validators.required],
      iconClass: [''],
      description: [''],
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    
  }
  async onSubmit() {
    if (this.bookForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('bookName', this.bookForm.get('bookName')?.value);
      formData.append('iconClass', this.bookForm.get('iconClass')?.value);
      formData.append('description', this.bookForm.get('description')?.value);

      try {
        this.uploadService.uploadBook(formData).subscribe((res: any) => {
          console.log(res);
          // this.imageUrl = res.image_url;
          if (res) {
            this.msg.success('Book added successfully!');
            this.bookForm.reset();
            this.selectedFile=null
          }
        })
      } catch (error) {
        console.log(error);
        this.msg.error('Failed to add book.');
      } 
    } else {
      this.msg.error('Please Fill Form Correctly.');
    }
  }
  clases: any
  
  getdata() {
    try {
      this.http.get('classes').subscribe((res: any) => {
        console.log(res);
        this.clases =this.sortClasses(res) 
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
}
