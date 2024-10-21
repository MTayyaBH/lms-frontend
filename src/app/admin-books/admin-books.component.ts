import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DbServiceService } from '../db-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
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
      this.http.post('books/getbyuid', {id:uid}).subscribe(
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
  loader:boolean=false
  startLoading() {
    this.loader = true
    document.getElementById('imageloader')?.classList.add('disabled')
  }
  closeLoading() {
    this.loader = false
    document.getElementById('imageloader')?.classList.remove('disabled')
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const validImageTypes = ['image/jpeg','image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
      if (validImageTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append('image', file);
        
        this.startLoading();
        
        this.uploadService.post('imageupload/create', formData).subscribe((res: any) => {
          if (res) {
            console.log(res);
            this.closeLoading();
            this.imageUrl = res;
            this.msg.success('Image Uploaded');
          } else {
            this.closeLoading();
            this.msg.error('Some error occurred');
          }
        });
      } else {
        this.closeLoading();
        console.log('Invalid file type');
        this.msg.error('Please select a valid image file');
      }
    } else {
      this.closeLoading();
      console.log('No file selected');
      this.msg.error('Image not selected');
    }
  }
  
 // onFileChange(evt: any) {
  //   const target: DataTransfer = <DataTransfer>(evt.target);
  //   if (target.files.length !== 1) {
  //     console.error('Cannot use multiple files');
  //     return;
  //   }
  //   this.startLoading()
  //   const reader: FileReader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const bstr: string = e.target.result;
  //     const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
  //     const wsname: string = wb.SheetNames[0];
  //     const ws: XLSX.WorkSheet = wb.Sheets[wsname];
  //     const data = XLSX.utils.sheet_to_json(ws, { header: 1 }); 
  //     const headers:any = data[0]; 
  //     const rows = data.slice(1);
  //     const jsonData = rows.map((row: any) => {
  //       const rowObj: any = {};
  //       headers.forEach((header: string, index: number) => {
  //         rowObj[header] = row[index] !== undefined ? row[index] : null;
  //       });
  //       return rowObj;
  //     });
  //     this.closeLoading()
  //     console.log(JSON.stringify(jsonData, null, 2)); 
  //   }; 
    
  //   reader.readAsBinaryString(target.files[0]);
  // }
  // uploadProgress:any=0
  // onFileChange(evt: any) {
  //   const file = evt.target.files[0];
  //   if (!file) {
  //     console.error('No file selected');
  //     return;
  //   }

  //   this.startLoading();

  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   // Post the formData and track the upload progress
  //   this.http.post('http://localhost:3000/imageupload/xlsx', formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   }).subscribe((event: HttpEvent<any>) => {
  //     switch (event.type) {
  //       case HttpEventType.UploadProgress:
  //         // Compute and show the % done:
  //         if (event.total) {
  //           this.uploadProgress = Math.round(100 * event.loaded / event.total);
  //           console.log(`Upload Progress: ${this.uploadProgress}%`);
  //         }
  //         break;
  //       case HttpEventType.Response:
  //         console.log('File uploaded successfully:', event.body);
  //         this.uploadProgress = 0; // Reset progress on completion
  //         this.closeLoading();
  //         break;
  //       default:
  //         break;
  //     }
  //   }, error => {
  //     console.error('Error uploading file:', error);
  //     this.closeLoading();
  //   });
  // }
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
      this.http.post('classes/getclasses',{}).subscribe((res: any) => {
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
