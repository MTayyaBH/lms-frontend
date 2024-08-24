declare var google: any
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import { Route, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  logindata: any = localStorage.getItem('userdata')
  ngOnInit() {
    if (this.logindata) {
      this.rout.navigate(['/home'])
      this.createMessage('error', 'Logout First')
    }
  }
  constructor(
    private service: DbServiceService,
    private rout: Router,
    private message: NzMessageService
  ) { }
  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: '539887466213-eb830e4mvb4012pl2c7lfu2siaknfar9.apps.googleusercontent.com',
      callback: (res: any) => this.handleLogin(res)
    });
    google.accounts.id.renderButton(document.getElementById('login-google-btn'), {
      theme: 'filled_white',
      size: 'large',
      shape: 'square',
      width: 230,
    })
  }
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }
  handleLogin(res: any) {
    // decode the token 
    if (res) {
      const payLoad = this.decodeToken(res.credential)
      // console.log("payLoad", payLoad)
      // store it in session
      let user = payLoad;
      let obj: any = {};
      obj['fullname'] = user.name;
      obj['image'] = user.picture;
      obj['email'] = user.email;
      obj['usertype'] = 'google';
      try {
        this.service.post('signup-account', obj).subscribe({
          next: (res: any) => {
            if (res && res.success) {
            console.log(res.user);
            const encryptedData = this.service.encrypt(JSON.stringify(res.user), this.service.secretkey);
            localStorage.setItem('userdata', encryptedData);
            this.createMessage('success', 'Login Successful!');
            this.rout.navigate(['/home']);
            }else{
              this.createMessage('error',res.message)
            }
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {
          }
        })
      } catch (error) {
        console.log(error);
        
      }
    }
  }
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
      this.service.login(this.signupForm.value)

    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}
