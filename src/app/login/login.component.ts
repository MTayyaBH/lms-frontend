import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import { Route, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logindata: any = localStorage.getItem('userdata')
  ngOnInit() {
    if (this.logindata) {
      this.rout.navigate(['/home'])
      this.createMessage('error','Logout First')
    }
  }
  constructor(
    private service: DbServiceService,
    private rout: Router,
    private message:NzMessageService
  ) { }
  signupForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], asyncValidators: [] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(4)], asyncValidators: [] }),
    rememberme: new FormControl(false)
  });
  createMessage(type: string, msg: any): void {
    this.message.create(type, `${msg}`);
  }
  get email(): AbstractControl {
    return this.signupForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.signupForm.get('password')!;
  }
  submitForm() {
    if (this.signupForm.valid) {
      // debugger
      this.service.checkuserlogin(this.signupForm.value)

    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
