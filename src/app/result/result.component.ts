import { Component, OnInit, Output } from '@angular/core';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  constructor(private dbservice: DbServiceService) { }
  result:any={}
  ngOnInit() {
    this.getmcqs()
  }
  @Output() quizzes:any=this.dbservice.TestMCQs
  getmcqs() {
    const test = this.dbservice.TestMCQs
    console.log(this.calculateResults(test));
    this.result=this.calculateResults(test)

  }
  calculateResults(questions: any) {
    let total = 0;
    let correct = 0;

    for (const question of questions) {
      console.log(question);
      total++;
      if (question.useranswer === question.trueoption) {
        correct++;
      }
    }
    return { total, correct };
  }
}