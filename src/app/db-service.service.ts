import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {
  notify = new EventEmitter<void>();
  triggerNotify() {
    this.notify.emit();
  }
  public secretkey: string = 'lmsdatadcinandularnestjsmongodb97etc';
  private url: string = 'http://localhost:3000';
  logindata: any;
TestMCQs:any
  constructor(
    private httpclient: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) {}
  uploadBook(formData: any) {
    return this.httpclient.post<any>(`${this.url}/books/create`, formData);
  }
  post(table: any, data: any) {
    return this.httpclient.post(`${this.url}/${table}`, data);
  }
  getbyid(tble: any, id: any) {
    return this.httpclient.get(`${this.url}/${tble}/${id}`);
  }
  get(table:any){
    return this.httpclient.get(`${this.url}/${table}`)
  }
  
  getallwithdata(table:any,data:any){
    let params = new HttpParams();
    params = params.set('data', JSON.stringify(data));
    
    return this.httpclient.get(`${this.url}/${table}`, { params });
  }
  

  checkuserlogin(loginData: any) {
    this.logindata = loginData;
    this.httpclient.post(`${this.url}/login`, this.logindata).pipe(
      catchError(error => {
        console.error('Error logging in:', error);
        return throwError(error);
      }) 
    ).subscribe((res: any) => {
      if (res && res.success) {
        console.log(res.user);
        
        const encryptedData = this.encrypt(JSON.stringify(res.user), this.secretkey);
        localStorage.setItem('userdata', encryptedData);
        this.createMessage('success', 'Login Successful!');
        this.router.navigate(['/home']);
      } else {
        console.log(res);
        
        if (res.message==='Password Incorrect') {
          this.createMessage('error',res.message)
        } else {
          this.createMessage('error',res.message);
        }
        
      }
    });
  }

  encrypt(message: any, key: string): string {
    return CryptoJS.AES.encrypt(message, key).toString();
  }

  decrypt(encryptedMessage: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  createMessage(type: string, msg: string): void {
    this.message.create(type, msg);
  }
}
