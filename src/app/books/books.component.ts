import { Component, Input, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  @Input() classuid: any
  loader:boolean=true
  notfound:boolean=false
  constructor(private http: DbServiceService, private router: Router) { }
  ngOnInit(): void {
    this.getbooks(this.classuid)
  }
  routingdata: any
  books: any
  getbooks(id: any) {
    this.http.post('books/getbyid', {id}).subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.loader = false;
          if (Array.isArray(res) && res.length === 0) {
            this.notfound = true;
          } else {
            this.books = res;
          }
        }, 0);
        
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    });
  }
  
  nevegat(uid: any) {
    // const data = this.dbservice.encrypt(type,'112233')
    this.router.navigate(['/LMS/OnlineTest/Class/Book'], { queryParams: { ClassName: this.classuid, BookName: uid } });
  }
}
