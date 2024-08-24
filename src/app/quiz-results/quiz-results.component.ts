import { Component, Input, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {
  ngOnInit() {
    this.questions = this.dbservice.TestMCQs
  }
  constructor(private dbservice: DbServiceService) { }
  questions: any[] = [];

  isCorrect(question: any, option: string): boolean {
    return this.dbservice.decrypt(question.trueoption,'trueoption') === option;
  }

  isUserOption(question: any, option: string): boolean {
    return question.useranswer === option;
  }
}
