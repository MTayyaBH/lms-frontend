import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import * as CryptoJS from 'crypto-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-starttest',
  templateUrl: './starttest.component.html',
  styleUrls: ['./starttest.component.css']
})
export class StarttestComponent implements OnInit,OnDestroy {
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
  notfound: boolean = false
  loader: boolean = true
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dbservice: DbServiceService,
    public message: NzMessageService,
    private renderer: Renderer2
  ) {
    this.myForm = this.fb.group({
      option: [false]
    });
  }
  parmsData: any = {}
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.parmsData.ClassName = params['ClassName'];
      this.parmsData.BookName = params['BookName'];
      this.parmsData.TestType = params['TestType'];
    });
    this.checkLogin();
  }
  createMessage(type: string, msg: any): void {
    this.message.create(type, `${msg}`);
  }
  ngOnDestroy() {
    this.stopCounter()
  }
  min: any = 9;
  sec: any = 59;
  intervalId: any;

  counterquiz() {
    this.intervalId = setInterval(() => {
      if (this.sec > 0) {
        this.sec--;
        this.mcqssetinlocalstorage()
      } else if (this.min > 0) {
        this.min--;
        this.mcqssetinlocalstorage()
        this.sec = 59;
      } else {
        this.stopCounter();
        this.testtimeout()
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
      this.userdatadecript();
      this.getmcqsinlocalstorage()
    } else {
      this.router.navigate(['/Login']);
      this.createMessage('error', 'Login Now!');
    }
  }

  startTest(type: any) {
    let mcqtype = type.toLowerCase()
    this.mcqs = this.mcqs.filter((mcq: { type: string }) => mcq.type.toLowerCase() === mcqtype)
    if (this.mcqs?.length === 0) {
      this.notfound = true
      return
    }
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


  headerdata: any
  getmcqs() {
    const data = {
      class: this.parmsData.ClassName,
      subject: this.parmsData.BookName,
      testtype: this.parmsData.TestType

    };
    console.log(data);

    this.dbservice.getallwithdata('lms-mcqs', data).subscribe((res: any) => {
      if (res) {
        setTimeout(() => {
          this.loader = false
          if (Array.isArray(res.mcqs) && res.mcqs.length === 0) {
            this.notfound = true;
          } else {
          }
        }, 500);
        let chaptername: string | undefined;
        this.totalmcqs = res.mcqs;
        console.log(res);
        this.mcqs = res.mcqs;
        if (res?.cbc?.[0]?.chapters === 'FullBook') {
          chaptername = res.cbc[0].chapters;
        } else {
          const filterChapter = res?.cbc?.[0]?.chapters?.filter((c: { uid: any }) => c.uid === data.testtype);
          chaptername = filterChapter?.[0]?.title || 'Single Chapter Test';
        }
        this.headerdata = {
          classname: res?.cbc?.[0]?.classname || 'Class Name',
          bookname: res?.cbc?.[0]?.book_name || 'Book Name',
          chaptername
        };
      }
    }, (error) => {
      console.error('Error fetching data:', error);
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
      this.Answer = this.displaumcq.useranswer
    } else {
      this.myForm.reset();
    }
    this.mcqssetinlocalstorage()
  }
  jumpmcqs(index: any) {
    this.getuserquizanswer();
    this.nextmcqs = index;
    this.getonemcq();
  }
  Next() {
    if (this.myForm.value.option) {
      if (this.nextmcqs < this.givemcqs.length - 1) {
        this.getuserquizanswer();
        this.scrollNext1()
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
  Answer: any
  skip() {
    if (this.nextmcqs < this.givemcqs.length - 1) {
      this.scrollNext1()
      this.nextmcqs++;
      this.getonemcq();
    } else {
      this.createMessage('warning', 'Quiz MCQs Limit Reached!')
    }
  }
  Cancel() {
    Swal.fire({
      title: `<strong class="text-sm md:text-xl">Are You Want to Cancel!</strong>`,
      icon: "warning",
      // html: `
      //       <div class="text-xs md:text-lg text-gray-700 dark:text-gray-200">
      //         Please Submit or Cancel Test!
      //       </div>`,
      showCloseButton: false,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `<i class="fa-solid fa-check-circle"></i> Confirm!`,
      confirmButtonAriaLabel: 'Confirm cancellation of the test',
      cancelButtonText: `<i class="fa-solid fa-times-circle"></i> Cancel`,
      cancelButtonAriaLabel: 'Cancel the test',
      customClass: {
        popup: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-full sm:max-w-md md:max-w-lg mx-auto p-4 overflow-hidden',
        title: 'text-gray-800 dark:text-gray-100 text-sm md:text-xl',
        icon: 'text-yellow-500',
        confirmButton: 'bg-green-600 hover:bg-green-700 text-white select-none outline-none border-0 mr-2 px-4 py-2 rounded-md text-sm md:text-base',
        cancelButton: 'bg-red-600 hover:bg-red-700 text-white px-4 select-none outline-none border-0 ml-2 py-2 rounded-md text-sm md:text-base',
      },
      buttonsStyling: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.removemcqsinlocalstorage();
        this.countstart = 3
        this.isTestStart = false
        this.getmcqs();
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }
  submitbutton() {
    Swal.fire({
      title: `<strong class="text-sm md:text-xl">Are You Want to Submit!</strong>`,
      icon: "warning",
      // html: `
      //       <div class="text-xs md:text-lg text-gray-700 dark:text-gray-200">
      //         Please Submit or Cancel Test!
      //       </div>`,
      showCloseButton: false,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: `<i class="fa-solid fa-check-circle"></i> Confirm!`,
      confirmButtonAriaLabel: 'Confirm cancellation of the test',
      cancelButtonText: `<i class="fa-solid fa-times-circle"></i> Cancel`,
      cancelButtonAriaLabel: 'Cancel the test',
      customClass: {
        popup: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-full sm:max-w-md md:max-w-lg mx-auto p-4 overflow-hidden',
        title: 'text-gray-800 dark:text-gray-100 text-sm md:text-xl',
        icon: 'text-yellow-500',
        confirmButton: 'bg-green-600 hover:bg-green-700 text-white select-none outline-none border-0 mr-2 px-4 py-2 rounded-md text-sm md:text-base',
        cancelButton: 'bg-red-600 hover:bg-red-700 text-white px-4 select-none outline-none border-0 ml-2 py-2 rounded-md text-sm md:text-base',
      },
      buttonsStyling: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.Submit()
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })
  }
  prev() {
    if (this.nextmcqs > 0) {
      this.scrollPrev1()
      this.nextmcqs--;
      this.getonemcq();
    } else {
      this.createMessage('warning', 'Quiz MCQs Limit Not Backword!')
    }
  }
  Submit() {
    this.getuserquizanswer()
    this.stopCounter();
    let result = {
      name: this.userdata.fullname,
      userid: this.userdata.uid,
      classname: this.parmsData.ClassName,
      bookname: this.parmsData.BookName,
      testtype: this.parmsData.TestType,
      min: this.min,
      sec: this.sec,
      mcqs: this.givemcqs
    }
    this.dbservice.TestMCQs = result
    this.removemcqsinlocalstorage();
    this.router.navigate(['/LMS/OnlineTest/Result'])
  }
  getuserquizanswer() {
    this.givemcqs[this.nextmcqs] = {
      ...this.displaumcq,
      useranswer: this.myForm.value.option
    };
    console.log(this.givemcqs);
  }
  encrypt(message: any, key: string): string {
    const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
    return CryptoJS.AES.encrypt(messageStr, key).toString();
  }
  decrypt(encryptedMessage: string, key: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedMessage);
  }
  mcqssetinlocalstorage() {
    let time = { min: this.min, sec: this.sec, index: this.nextmcqs, ctime: Date.now() };
    let storetime = this.encrypt(time, 'time');
    localStorage.setItem('classdata', JSON.stringify(this.headerdata))
    localStorage.setItem('time', storetime);
    localStorage.setItem('mcqs', JSON.stringify(this.givemcqs));
    localStorage.setItem('dispalymcqs', JSON.stringify(this.displaumcq))
  }
  getmcqsinlocalstorage() {
    try {
      let time = localStorage.getItem('time');
      let mcqs = localStorage.getItem('mcqs');
      let data = localStorage.getItem('classdata');
      let dispalymcqs = localStorage.getItem('dispalymcqs');

      if (time && mcqs && data && dispalymcqs) {
        Swal.fire({
          title: `<strong class="text-sm md:text-xl">Existing Test is Remain</strong>`,
          icon: "warning",
          html: `
                <div class="text-xs md:text-lg text-gray-700 dark:text-gray-200">
                  Start Your Remaining Test!
                </div>`,
          showCloseButton: false,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `<i class="fa fa-play"></i> Yes!`,
          confirmButtonAriaLabel: "Start the test",
          cancelButtonText: `<i class="fa fa-redo"></i> New Test`,
          cancelButtonAriaLabel: "Restart the test",
          customClass: {
            popup: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-full sm:max-w-md md:max-w-lg mx-auto p-4 overflow-hidden',
            title: 'text-gray-800 dark:text-gray-100 text-sm md:text-xl',
            icon: 'text-yellow-500',
            confirmButton: 'bg-green-500 hover:bg-green-600 text-white select-none outline-none border-0 mr-2 px-4 py-2 rounded-md text-sm md:text-base',
            cancelButton: 'bg-red-500 hover:bg-red-600 text-white px-4 select-none outline-none border-0 ml-2 py-2 rounded-md text-sm md:text-base',
          },
          buttonsStyling: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            let timegiv = this.decrypt(time as string, 'time');
            let currentTime = Date.now();
            let elapsedTime = Math.floor((currentTime - timegiv.ctime) / 1000);
            let usertime = timegiv.min * 60 + timegiv.sec;
            let csec = usertime - elapsedTime;
            if (csec > 0) {
              this.min = Math.floor(csec / 60);
              if (this.min >= 0 && this.min < 10) {
                this.headerdata = JSON.parse(data as string);
                this.givemcqs = JSON.parse(mcqs as string);
                this.displaumcq = JSON.parse(dispalymcqs as string);
                this.sec = csec % 60;
                this.nextmcqs = timegiv.index;
                this.countstart = 0;
                this.counterquiz();
              } else {
                this.removemcqsinlocalstorage();
                this.getmcqs();
                this.message.error('Some Problem Found');
              }
            } else {
              // this.removemcqsinlocalstorage();
              // this.getmcqs()
              this.testtimeout()
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.removemcqsinlocalstorage();
            this.getmcqs();
          }
        });
      } else {
        this.getmcqs();
      }
    } catch (error) {
      console.error('Error retrieving or processing quiz data:', error);
      this.getmcqs();
    }
  }
  testtimeout() {
    try {
      let time = localStorage.getItem('time');
      let mcqs = localStorage.getItem('mcqs');
      let data = localStorage.getItem('classdata');
      let dispalymcqs = localStorage.getItem('dispalymcqs');

      if (time && mcqs && data && dispalymcqs) {
        Swal.fire({
          title: `<strong class="text-sm md:text-xl">Yout Test Time is out!</strong>`,
          icon: "warning",
          html: `
                <div class="text-xs md:text-lg text-gray-700 dark:text-gray-200">
                  Please Submit or Cancel Test!
                </div>`,
          showCloseButton: false,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `<i class="fa fa-check-circle"></i> Submit`,
          confirmButtonAriaLabel: 'Submit the test',
          cancelButtonText: `<i class="fa fa-times-circle"></i> Cancel`,
          cancelButtonAriaLabel: 'Cancel the test',
          customClass: {
            popup: 'bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-full sm:max-w-md md:max-w-lg mx-auto p-4 overflow-hidden',
            title: 'text-gray-800 dark:text-gray-100 text-sm md:text-xl',
            icon: 'text-yellow-500',
            confirmButton: 'bg-green-500 hover:bg-green-600 text-white select-none outline-none border-0 mr-2 px-4 py-2 rounded-md text-sm md:text-base',
            cancelButton: 'bg-red-500 hover:bg-red-600 text-white px-4 select-none outline-none border-0 ml-2 py-2 rounded-md text-sm md:text-base',
          },
          buttonsStyling: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        }).then((result) => {
          if (result.isConfirmed) {
            this.headerdata = JSON.parse(data as string);
            this.givemcqs = JSON.parse(mcqs as string);
            this.displaumcq = JSON.parse(dispalymcqs as string);
            this.Submit()
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.removemcqsinlocalstorage();
            this.countstart = 3
            this.isTestStart = false
            this.getmcqs();
          }
        });
      } else {
        this.countstart = 3
        this.isTestStart = false
        this.getmcqs();
      }
    } catch (error) {
      console.error('Error retrieving or processing quiz data:', error);
      this.countstart = 3
      this.isTestStart = false
      this.getmcqs();
    }
  }


  removemcqsinlocalstorage() {
    this.stopCounter()
    localStorage.removeItem('time');
    localStorage.removeItem('mcqs')
    localStorage.removeItem('dispalymcqs')
    localStorage.removeItem('classdata')
  }
  @ViewChild('paginationContainer', { read: ElementRef }) paginationContainer!: ElementRef;
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;
  scrollNext() {
    const container = this.paginationContainer.nativeElement;
    container.scrollLeft += 70;
  }
  scrollPrev() {
    const container = this.paginationContainer.nativeElement;
    container.scrollLeft -= 70;
  }
  scrollNext1() {
    if (this.nextmcqs >= 2) {
      const container = this.paginationContainer.nativeElement;
      container.scrollLeft += 40;
    }
  }
  scrollPrev1() {
    if (this.nextmcqs <= 17) {
      const container = this.paginationContainer.nativeElement;
      container.scrollLeft -= 40;
    }
  }
  startDrag(event: MouseEvent) {
    this.isDragging = true;
    const container = this.paginationContainer.nativeElement;
    this.startX = event.pageX - container.offsetLeft;
    this.scrollLeft = container.scrollLeft;
    this.renderer.addClass(container, 'dragging');
  }
  stopDrag() {
    this.isDragging = false;
    const container = this.paginationContainer.nativeElement;
    this.renderer.removeClass(container, 'dragging');
  }
  onDrag(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    const container = this.paginationContainer.nativeElement;
    const x = event.pageX - container.offsetLeft;
    const walk = (x - this.startX) * 1.5; // Scroll faster
    container.scrollLeft = this.scrollLeft - walk;
  }

}
