import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import * as CryptoJS from 'crypto-js';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-starttest',
  templateUrl: './starttest.component.html',
  styleUrls: ['./starttest.component.css']
})
export class StarttestComponent implements OnInit {
  myForm: FormGroup;
  isTestStart: boolean = false;
  class: string | null = null;
  subject: string | null = null;
  testtype: any;
  islogin: boolean = false;
  userdata: any;
  totalmcqs: any;
  mcqs: any;
  givemcqs: any = [];
  displaumcq: any = {};
  nextmcqs: number = 0;
  countstart: number = 3;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dbservice: DbServiceService,
    public message: NzMessageService,
  ) {
    this.myForm = this.fb.group({
      option: [false]
    });
  }
  parmsData: any={}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.parmsData.ClassName = params['ClassName'];
      this.parmsData.BookName = params['BookName'];
      this.parmsData.TestType = params['TestType'];
    });
    
    this.checkLogin();
    this.userdatadecript();
  }

  createMessage(type: string, msg: any): void {
    this.message.create(type, `${msg}`);
  }
  min: any = 10;
  sec: any = 59;
  intervalId: any;

  counterquiz() {
    this.intervalId = setInterval(() => {
      if (this.sec > 0) {
        this.sec--;
      } else if (this.min > 0) {
        this.min--;
        this.sec = 59;
      } else {
        this.stopCounter();
        this.Submit();
      }
      this.min = this.min.toString().padStart(2, '0');
      this.sec = this.sec.toString().padStart(2, '0');
    }, 1000);
  }

  stopCounter() {
    clearInterval(this.intervalId);
  }
  checkLogin() {
    const user = localStorage.getItem('userdata');
    if (user) {
      this.islogin = true;
      this.getmcqs();
    } else {
      this.router.navigate(['/Login']);
      this.createMessage('error', 'Login Now!');
    }
  }

  startTest(type: any) {
    let mcqtype = type.toLowerCase()
    this.mcqs = this.mcqs.filter((mcq: { type: string }) => mcq.type.toLowerCase() === mcqtype)

    this.isTestStart = !this.isTestStart;
    this.getquiz();
    this.counter();
  }
  intervalId2: any
  counter() {
    this.intervalId2 = setInterval(() => {
      if (this.countstart > 0) {
        this.countstart--;
      } else {
        clearInterval(this.intervalId2); // Clear the interval
        this.counterquiz();
      }
    }, 1000);
  }


  userdatadecript() {
    this.userdata = this.decryptStoredData();
  }

  decryptStoredData(): any {
    const encryptedDataLocal = localStorage.getItem('userdata');
    if (encryptedDataLocal) {
      const bytes = CryptoJS.AES.decrypt(encryptedDataLocal, this.dbservice.secretkey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    }
    return null;
  }


  getmcqs() {
    const data = {
      class: this.parmsData.ClassName,
      subject: this.parmsData.BookName,
      testtype: this.parmsData.TestType

    };
    
    console.log(data);

    this.dbservice.getallwithdata('lms-mcqs', data).subscribe((res: any) => {
      if (res) {
        this.totalmcqs = res;
        console.log(res);

        this.mcqs = res
        // const classLower = this.class?.toLocaleLowerCase();
        // const subjectLower = this.subject?.toLocaleLowerCase();
        // const testtypeLower = data.testtype.toLowerCase();

        // const quiz = res.filter((mcq: { classname: string | null; bookname: string | null; }) =>
        //   mcq.classname?.toLocaleLowerCase() === classLower &&
        //   mcq.bookname?.toLocaleLowerCase() === subjectLower
        // );

        // this.mcqs = testtypeLower !== 'fullbook'
        //   ? quiz.filter((mcq: { unit: string }) => mcq.unit.toLowerCase() === testtypeLower)
        //   : quiz;


      }
    });
  }

  getRandomIndex(array: any[]): number {
    return Math.floor(Math.random() * array.length);
  }

  getquiz() {
    const selectedStatements = new Set<string>();
    const selectedIndices = new Set<number>();
    const minQuestions = 20;
    const numQuestions = Math.min(minQuestions, this.mcqs.length);
    const mcqsToSelect = this.mcqs.length < minQuestions ? this.mcqs.length : numQuestions;
    const maxIterations = 300;
    let iterationCount = 0;
    while (selectedIndices.size < mcqsToSelect && iterationCount < maxIterations) {
      const randomIndex = this.getRandomIndex(this.mcqs);
      if (!selectedIndices.has(randomIndex) && !selectedStatements.has(this.mcqs[randomIndex].statement)) {
        const mcq = { ...this.mcqs[randomIndex], id: this.getRandomId() };
        this.givemcqs.push(mcq);
        selectedIndices.add(randomIndex);
        selectedStatements.add(this.mcqs[randomIndex].statement);
      }
      iterationCount++;
    }
    if (selectedIndices.size < mcqsToSelect) {
      console.warn(`Unable to select ${mcqsToSelect} MCQs. Only ${selectedIndices.size} MCQs were selected.`);
    }
    this.getonemcq();
  }




  getRandomId(): string {
    const digits = '0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
      id += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return id;
  }

  getonemcq() {
    this.displaumcq = this.givemcqs[this.nextmcqs];
    if (this.displaumcq.useranswer) {
      this.myForm.patchValue({ option: this.displaumcq.useranswer });
    } else {
      this.myForm.reset();
    }
  }

  Next() {
    if (this.myForm.value.option) {
      if (this.nextmcqs < this.givemcqs.length - 1) {
        this.getuserquizanswer();
        this.nextmcqs++;
        this.getonemcq();
      } else {
        this.createMessage('warning', 'Quiz MCQs Limit Reached!')
      }
    }
    else {
      this.createMessage('error', 'Please Select One Option!')
    }
  }

  skip() {
    if (this.nextmcqs < this.givemcqs.length - 1) {
      this.nextmcqs++;
      this.getonemcq();
    } else {
      this.createMessage('warning', 'Quiz MCQs Limit Reached!')
    }
  }

  prev() {
    if (this.nextmcqs > 0) {
      this.nextmcqs--;
      this.getonemcq();
    } else {
      this.createMessage('warning', 'Quiz MCQs Limit Not Backword!')
    }
  }
  Submit() {
    this.getuserquizanswer()
    this.dbservice.TestMCQs = this.givemcqs
    this.router.navigate(['/LMS/OnlineTest/Result'])
  }
  getuserquizanswer() {
    this.givemcqs[this.nextmcqs] = {
      ...this.displaumcq,
      useranswer: this.myForm.value.option
    };
    console.log(this.givemcqs);
  }
}
