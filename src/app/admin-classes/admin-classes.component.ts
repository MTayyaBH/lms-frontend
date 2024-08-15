import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-admin-classes',
  templateUrl: './admin-classes.component.html',
  styleUrls: ['./admin-classes.component.css']
})
export class AdminClassesComponent {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private msg: NzMessageService,private http:DbServiceService) {
    this.validateForm = this.fb.group({
      className: [null, [Validators.required]],
      classDescription: [null, [Validators.required]],
      classDate: [null, [Validators.required]],
      classTime: [null, [Validators.required]],
      classInstructor: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('Form data:', this.validateForm.value);
      try {
        this.http.post('classes',this.validateForm.value).subscribe((res:any)=>{
          console.log(res);
          if (res.submit) {
            this.msg.success(res.message);
            this.validateForm.reset()
          } else {
            this.msg.error(res.message);
          }
        })
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
