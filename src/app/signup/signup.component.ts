import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DbServiceService } from '../db-service.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(
    private http: DbServiceService,
    private message: NzMessageService,
    private rout: Router
  ) { }
  signupForm = new FormGroup({
    fullname: new FormControl('', { validators: [Validators.required, Validators.minLength(3)], asyncValidators: [] }),
    email: new FormControl('', { validators: [Validators.required, Validators.email], asyncValidators: [] }),
    password: new FormControl('', { validators: [Validators.required, Validators.minLength(4)], asyncValidators: [] }),
    confirmPassword: new FormControl('', { validators: [Validators.required], asyncValidators: [this.matchPassword()] })
  });

  matchPassword(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const password = this.signupForm.get('password');
      if (password && control.value !== password.value) {
        return of({ match: true });
      }
      return of(null);
    };
  }

  get fullname(): AbstractControl {
    return this.signupForm.get('fullname')!;
  }

  get email(): AbstractControl {
    return this.signupForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.signupForm.get('password')!;
  }

  get confirmPassword(): AbstractControl {
    return this.signupForm.get('confirmPassword')!;
  }

  submitForm() {
    if (this.signupForm.valid) {
      this.startLoading();
      this.http.post('signup-account', this.signupForm.value).subscribe({
        next: (res: any) => {
          if (res.error === 'Email already exists') {
            this.createMessage('error', 'Email already exists');
            this.closeLoading();
          } else if (res.error) {
            this.createMessage('error', res.error);
            this.closeLoading();
          } else {
            this.createMessage('success', 'Account Created Successfully');
            this.signupForm.reset()
            this.rout.navigate(['/Login'])
          }
        },
        error: (err) => {
          console.error(err);
          this.createMessage('error', 'An error occurred');
          this.closeLoading()
        },
        complete: () => {
          this.closeLoading();

        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  createMessage(type: string, msg: any): void {
    this.message.create(type, `${msg}`);
  }
  loader: boolean = false
  startLoading() {
    this.loader = true
    document.getElementById('loaderdiv')?.classList.add('disabled')
  }
  closeLoading() {
    this.loader = false
    document.getElementById('loaderdiv')?.classList.remove('disabled')
  }
}
