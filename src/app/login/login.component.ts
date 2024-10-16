declare var google: any
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import { Route, Router } from '@angular/router';
import confetti from 'canvas-confetti';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  logindata: any = localStorage.getItem('userdata')
  array = [1, 2, 3, 4, 5, 6]
  // triggerGoogleLogin(): void {
  //   const loginButton = document.getElementById('login-google-btn');
  //   if (loginButton) {
  //     loginButton.click();
  //   }
  // }
  ngOnInit() {
    if (this.logindata) {
      this.rout.navigate(['/home'])
      this.createMessage('error', 'Logout First')
    }

  }
  handleClick() {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ['#a786ff', '#fd8bbc', '#eca184', '#f8deb1'];
    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }
  constructor(
    private service: DbServiceService,
    private rout: Router,
    private message: NzMessageService
  ) { }
  ngAfterViewInit(): void {
    google.accounts.id.initialize({
      client_id: '613357913726-u57j7i4tbdnmmpddm9c21f1h351fu03d.apps.googleusercontent.com',
      callback: (res: any) => this.handleLogin(res)
    });
    google.accounts.id.renderButton(document.getElementById('login-google-btn'), {
      theme: 'outline', 
      size: 'large',
      shape: 'square',
      width: 50,
    })
  }
  loader:boolean=false
  private decodeToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }
  handleLogin(res: any) {
    if (res) {
      const payLoad = this.decodeToken(res.credential)
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
              this.handleClick()
            } else {
              this.createMessage('error', res.message)
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
      this.loader = true;  
      this.service.login(this.signupForm.value).subscribe(
        (res: any) => {
          this.loader = false;  
          if (res && res.success) {
            this.createMessage('success', 'Login Successful!');
            const encryptedData = this.service.encrypt(JSON.stringify(res.user), this.service.secretkey);
              localStorage.setItem('userdata', encryptedData);
            this.rout.navigate(['/home']);
            this.handleClick()
          } else {
            if (res.message === 'Password Incorrect') {
              this.createMessage('error', res.message);
            } else {
              this.createMessage('error', res.message);
            }
          }
        },
        (error) => {
          this.loader = false;  
          console.error('Error logging in:', error);
          this.createMessage('error', error.message);
        }
      );
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
  
}

