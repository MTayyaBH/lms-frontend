import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
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
  // private url: string = 'https://neat-lobster-physically.ngrok-free.app/lms.api.edu.pk';
  // private url: string = 'https://fleet-factually-fowl.ngrok-free.app/lms.api.edu.pk';
  // private url: string = 'https://9375-39-59-12-216.ngrok-free.app/lms.api.edu.pk';
  private url: string = 'http://localhost:3000/lms.api.edu.pk';
  // private url: string = 'http://192.168.10.6:80/lms.api.edu.pk';
  logindata: any;
  TestMCQs: any
  
  constructor(
    private httpclient: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
   }
  uploadBook(formData: any) {
    return this.httpclient.post<any>(`${this.url}/books/create`, formData);
  }
  post(table: any, data: any) {
    return this.httpclient.post(`${this.url}/${table}`, data);
  }
  getbyid(tble: any, id: any) {
    return this.httpclient.get(`${this.url}/${tble}/${id}`);
  }
  updatebyid(table:any,id:any,data:any){
    return this.httpclient.put(`${this.url}/${table}/${id}`,data)
  }
  delete(table:any,id:any){
    return this.httpclient.delete(`${this.url}/${table}/${id}`);
  }
  get(table: any):any {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', // Specify the content type
      'Accept': 'application/json'         // Expect JSON response
    });
    return this.httpclient.get<any>(`${this.url}/${table}`,{headers})
  }

  getallwithdata(table: any, data: any) {
    let params = new HttpParams();
    params = params.set('data', JSON.stringify(data));

    return this.httpclient.get(`${this.url}/${table}`, { params });
  }
  checkuserlogin() {
    try {
      let data = localStorage.getItem('userdata')
      let user = data ? JSON.parse(data) : null
      if (user) {
        return user
      } else {
        this.createMessage('error', 'Login Now!');
        this.router.navigate(['/Login'])
        return false
      }
    } catch (error) {
      this.createMessage('error', 'Login Now!');
      this.router.navigate(['/Login'])
      return false
    }
  }

  login(loginData: any): Observable<any> {
    return this.httpclient.post(`${this.url}/login`, loginData).pipe(
      catchError(error => {
        return throwError(error);  
      })
    );
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

