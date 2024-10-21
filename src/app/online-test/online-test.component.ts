import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-online-test',
  templateUrl: './online-test.component.html',
  styleUrls: ['./online-test.component.css']
})
export class OnlineTestComponent implements OnInit {
  loader:boolean=true
  constructor(private http: DbServiceService,private router:Router) { }
  clases: any
  notfound:boolean=false
  ngOnInit() {
    this.getdata()
  }
  getdata() {
    let data={}
    try {
      this.http.post('classes/getclasses',data).subscribe((res: any) => {
        console.log(res);
        setTimeout(() => {
          this.loader=false
          if (Array.isArray(res) && res.length === 0) {
            this.notfound = true;
          } else {
            this.clases =this.sortClasses(res) 
          }
        }, 0);
      })
    } catch (error) {
      console.log(error);

    }
  }
   sortClasses(classes: any) {
    return classes.sort((a: { classname: string; }, b: { classname: string; }) => {
      const numA = this.extractNumber(a.classname);
      const numB = this.extractNumber(b.classname);
      if (numA === null && numB === null) return 0;
      if (numA === null) return 1;
      if (numB === null) return -1;
      return numA - numB;
    });
  }
  
   extractNumber(classname: string): number | null {
    const match = classname.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }
  nevegat(uid:any){
    // const data = this.dbservice.encrypt(type,'112233')
    this.router.navigate(['/LMS/OnlineTest/Class'], { queryParams: { ClassName: uid } });
  }
}
