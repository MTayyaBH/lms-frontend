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
  constructor(private http: DbServiceService, private router: Router) { }
  ngOnInit(): void {
    this.getbooks(this.classuid)
  }
  routingdata: any
  books: any
  getbooks(id: any) {
    try {
      this.http.getbyid('books', id).subscribe((res) => {
        console.log(res);
        this.books = res
      })
    } catch (error) {
      console.log(error);
    }
  }
  nevegat(uid: any) {
    // const data = this.dbservice.encrypt(type,'112233')
    this.router.navigate(['/LMS/OnlineTest/Class/Book'], { queryParams: { ClassName: this.classuid, BookName: uid } });
  }
}
