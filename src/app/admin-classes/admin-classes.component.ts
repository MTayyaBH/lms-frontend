import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DbServiceService } from '../db-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.css']
})
export class AdminClassesComponent implements OnInit{
  validateForm: FormGroup;
ngOnInit() {
  this.checkEditMode()
}
  constructor(
    private fb: FormBuilder,
     private msg: NzMessageService,
     private http:DbServiceService,
     private route:ActivatedRoute,
     private router:Router
    ) {
    this.validateForm = this.fb.group({
      className: [null, [Validators.required]],
      classDescription: [null, [Validators.required]],
      classDate: [null, [Validators.required]],
      classTime: [null, [Validators.required]],
      classInstructor: [null, [Validators.required]]
    });
  }
  editMode:boolean=false
  updateuid:any
  routerclassuid:any
  pathtoupdaterouter:any
  checkEditMode(): void {
    const uid = this.route.snapshot.queryParamMap.get('UID');
    const path = this.route.snapshot.queryParamMap.get('Path');
    const urlContainsEditMCQs = this.route.snapshot.url.some(segment => segment.path.includes('Update-Class'));
    if (urlContainsEditMCQs && uid && path) {
      this.pathtoupdaterouter = this.http.decrypt(path, 'path')
      console.log(this.pathtoupdaterouter);
      const urlParams = new URLSearchParams(this.pathtoupdaterouter.split('?')[1]);
      this.routerclassuid = urlParams.get('ClassName');
      this.updateuid = uid
      this.http.post('classes/getbyid', {id:uid}).subscribe(
        (res: any) => {
          console.log(res); 
          if (res && res.length > 0) {
            const classData = {
              className: res[0]?.classname || null,
              classDescription: res[0]?.classdescription || null,
              classDate: res[0]?.classdate || null,
              classTime: res[0]?.classtime ? new Date(`1970-01-01T${res[0].classtime}`) : null,
              classInstructor: res[0]?.classinstructor || null,
            };
            this.validateForm.patchValue(classData);
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
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Form data:', this.validateForm.value);
      try {
       if (!this.editMode) {
        this.http.post('classes',this.validateForm.value).subscribe((res:any)=>{
          console.log(res);
          if (res.submit) {
            this.msg.success(res.message);
            this.validateForm.reset()
          } else {
            this.msg.error(res.message);
          }
        })
       } else {        
        this.http.updatebyid('classes',this.updateuid,this.validateForm.value).subscribe((res:any)=>{
          if (res) {

            console.log(res);
            
            if (res.submit) {
              this.msg.success(res.message);
              this.validateForm.reset()
              this.router.navigate(['/Admin/Class-List'])
            } else {
              this.msg.error(res.message);
            }
          } else {
            this.msg.error('Data Not Update');
          }
        })
       }
      } catch (error) {
        this.msg.error('Some Error Occure');
      }
      
    } else {
      this.msg.error('Please Fill All Blank Correctly!');
      for (const i in this.validateForm.controls) {
        if (this.validateForm.controls.hasOwnProperty(i)) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }
}
