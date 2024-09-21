import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DbServiceService } from '../db-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit {
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
    private http: DbServiceService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.bookForm = this.fb.group({
      bookName: ['', Validators.required],
      iconClass: [''],
      description: [''],
    });
  }
  pathtoupdaterouter: any
  routerclassuid: any
  updateuid: any
  editMode: boolean = false
  checkEditMode(): void {
    const uid = this.route.snapshot.queryParamMap.get('UID');
    const path = this.route.snapshot.queryParamMap.get('Path');
    const urlContainsEditMCQs = this.route.snapshot.url.some(segment => segment.path.includes('Edit-Book'));
    if (urlContainsEditMCQs && uid && path) {
      this.pathtoupdaterouter = this.http.decrypt(path, 'path')
      console.log(this.pathtoupdaterouter);
      const urlParams = new URLSearchParams(this.pathtoupdaterouter.split('?')[1]);
      this.routerclassuid = urlParams.get('ClassName');
      this.updateuid = uid
      this.http.getbyid('books/bk', uid).subscribe(
        (res: any) => {
          if (res && res.length > 0) {
            this.editMode = true;
            this.imageUrl=res['0'].image_url
            const data = {
              bookName: res['0']?.book_name,
              iconClass: res['0']?.icon_class,
              description: res['0']?.description
            }
            this.bookForm.patchValue(data);
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
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('image', event.target.files[0]);
      this.uploadService.post('imageupload/create', formData).subscribe((res:any)=>{
        if (res) {
          console.log(res);
          this.imageUrl=res
          this.msg.success('Image Uploaded')
        }else{
          this.msg.error('Some error founded')
        }
      });
    } else {
      console.log('No file selected');
      this.msg.error('Image not selected')
    }
  }
  async onSubmit() {
    if (this.bookForm.valid && this.imageUrl) {
      const formData ={
        image:this.imageUrl.toString(),
        bookName:this.bookForm.get('bookName')?.value,
        iconClass:this.bookForm.get('iconClass')?.value,
        description:this.bookForm.get('description')?.value
      }
      try {
        if (this.editMode) {
          this.uploadService.updatebyid('books', this.updateuid, formData).subscribe({
            next: (res: any) => {
              console.log(res);
              if (res) {
                this.msg.success('Book updated successfully!');
                this.resetForm();
                this.router.navigate(['/Admin/Books-List'], { queryParams: { ClassName: this.routerclassuid } });
              }
            },
            error: (err) => {
              console.log(err);
              this.msg.error('Failed to update book.');
            },
          });
        } else {
          this.uploadService.post('books',formData).subscribe({
            next: (res: any) => {
              console.log(res);
              if (res) {
                this.msg.success('Book added successfully!');
                this.resetForm();
              }
            },
            error: (err) => {
              console.log(err);
              this.msg.error('Failed to add book.');
            },
          });
        }
      } catch (error) {
        console.log(error);
        this.msg.error('An unexpected error occurred.');
      }
    } else {
      this.msg.error('Please fill the form correctly.');
    }
  }
  
  resetForm() {
    this.bookForm.reset();
    this.selectedFile = null;
    this.imageUrl = null;
    this.editMode = false;
  }
  
  clases: any

  getdata() {
    try {
      this.http.get('classes').subscribe((res: any) => {
        console.log(res);
        this.clases = this.sortClasses(res)
        this.checkEditMode()
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
