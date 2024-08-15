import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-nineclass',
  templateUrl: './nineclass.component.html',
  styleUrls: ['./nineclass.component.css']
})
export class NineclassComponent implements OnInit{
  constructor( private route: ActivatedRoute,){}
  classuid:any
ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.classuid = params['ClassName'];
  });
}


}
