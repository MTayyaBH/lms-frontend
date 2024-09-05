import { Component, OnInit, Output } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import * as CryptoJS from 'crypto-js';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  constructor(
    private dbservice: DbServiceService,
    private toster: NzMessageService
  ) { }
  result: any = {}
  dateOptions: any = { day: '2-digit', month: 'short', year: 'numeric' };
  currentDate = new Date().toLocaleDateString('en-GB', this.dateOptions);

  ngOnInit() {
    this.getmcqs()
  }
  @Output() quizzes: any = this.dbservice.TestMCQs?.mcqs
  mcqsdata: any
  getmcqs() {
    this.mcqsdata = this.dbservice.TestMCQs
    this.result = this.calculateResults(this.mcqsdata?.mcqs)
  }
  result2: any = {}
  // calculateResults(questions: any) {
  //   let total = 0;
  //   let correct = 0;
  //   let wrong = 0;
  //   let skipped = 0;
  //   this.result2.total=total
  //   this.result2.correct=correct
  //   this.result2.wrong=wrong
  //   this.result2.skipped=skipped
  //   for (const question of questions) {
  //     total++;
  //     if (question.useranswer) {
  //       if (question.useranswer === this.decrypt(question.trueoption, 'trueoption')) {
  //         correct++;
  //       } else {
  //         wrong++;
  //       }
  //     } else {
  //       skipped++;
  //     }
  //   }
  //   this.percentage = Number(((correct / total) * 100).toFixed(2));
  //   if (this.percentage > 50) {
  //     this.resultstatement = 'Congratulation You Have passesd this quiz'
  //   } else {
  //     this.resultstatement = 'Bad you have not passed try again'
  //   }
  //   this.postresult()
  //   return { total, correct, wrong, skipped };
  // }

  decrypt(encryptedMessage: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  resultstatement: any
  percentage: any
  // postresult() {
  //   if (!this.mcqsdata) {
  //     this.toster.warning('No MCQ data available to submit.');
  //     return;
  //   }

  //   const mcqsdata = {
  //     ...this.mcqsdata,
  //     total: this.result2.total,
  //     correct: this.result2.correct,
  //     skipped: this.result2.skipped,
  //     wrong: this.result2.wrong,
  //   };

  //   this.dbservice.post('result/mcqs', mcqsdata).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.toster.success('Quiz submitted successfully!');
  //     },
  //     error: (error) => {
  //       console.error('Submission error:', error);
  //       this.toster.error('Failed to submit quiz result.');
  //     }
  //   });
  // }
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

    this.result2 = {
      total: total,
      correct: correct,
      wrong: wrong,
      skipped: skipped
    };

    this.percentage = Number(((correct / total) * 100).toFixed(2));
    this.resultstatement = this.percentage > 50
      ? 'Congratulations! You have passed this quiz.'
      : 'Sorry, you have not passed. Try again.';

    this.postresult();
    return this.result2;
  }

  postresult() {
    if (!this.mcqsdata) {
      this.toster.warning('No MCQ data available to submit.');
      return;
    }

    const mcqsdata = {
      ...this.mcqsdata,
      total: this.result2.total,
      correct: this.result2.correct,
      skipped: this.result2.skipped,
      wrong: this.result2.wrong,
    };
    this.dbservice.post('result/mcqs', mcqsdata).subscribe({
      next: (res) => {
        console.log(res);
        this.toster.success('Quiz submitted successfully!');
      },
      error: (error) => {
        console.error('Submission error:', error);
        this.toster.error('Failed to submit quiz result.');
      }
    });
  }

}