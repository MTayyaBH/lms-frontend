import { Component, OnInit, Output } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  constructor(private dbservice: DbServiceService) { }
  result:any={}
   dateOptions:any = { day: '2-digit', month: 'short', year: 'numeric' };
 currentDate = new Date().toLocaleDateString('en-GB', this.dateOptions);

  ngOnInit() {
    this.getmcqs()
  }
  @Output() quizzes:any=this.dbservice.TestMCQs?.mcqs
  mcqsdata: any
  getmcqs() {
    this.mcqsdata = this.dbservice.TestMCQs
    this.result = this.calculateResults(this.mcqsdata?.mcqs)
  }
  calculateResults(questions: any) {
    let total = 0;
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    for (const question of questions) {
      total++;
      if (question.useranswer) {
        if (question.useranswer === this.decrypt(question.trueoption, 'trueoption')) {
          correct++;
        } else {
          wrong++;
        }
      } else {
        skipped++;
      }
    }
    this.percentage = Number(((correct / total) * 100).toFixed(2));
    if (this.percentage>50) {
      this.resultstatement='Congratulation You Have passesd this quiz'
    } else {
      this.resultstatement='Bad you have not passed try again'
    }
    this.postresult()
    return { total, correct, wrong, skipped };
  }
  
  decrypt(encryptedMessage: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  resultstatement:any
  percentage:any
  postresult(){
    try {
      const mcqsdata={
        ...this.mcqsdata,
        total:this.result.total,
        correct:this.result.correct,
        skipped:this.result.skipped,
        wrong:this.result.wrong,
      }
      this.dbservice.post('result/mcqs',mcqsdata).subscribe((res)=>{
        console.log(res);
        
      })
    } catch (error) {
      console.log(error);
      
    }
  }
}