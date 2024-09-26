import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import { ActivatedRoute, } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-autogeneratepaper',
  templateUrl: './autogeneratepaper.component.html',
  styleUrls: ['./autogeneratepaper.component.css']
})
export class AutogeneratepaperComponent implements OnInit, AfterViewInit {
  form: any;
  constructor(
    private fb: FormBuilder,
    private dbservice: DbServiceService,
    private route: ActivatedRoute,
    private msg: NzMessageService,
  ) {
  }
  ngOnInit() {
    this.form = this.fb.group({
      classname: [''],
      bookname: [''],
      testtype: [''],
      chapternames: [[]],
      portions: [''],
      longportions: [''],
      questioninsortportion1: [''],
      questioninsortportion2: [''],
      questioninsortportion3: [''],
      longquestion1: [''],
      longquestion2: [''],
      longquestion3: [''],
      longquestion4: [''],
      longquestion5: [''],
      longquestion6: [''],
      choiceinsortportion1: [''],
      choiceinsortportion2: [''],
      choiceinsortportion3: [''],
      choiceinlongquestions: [''],
      questioninsortportion1schema: this.fb.array([]),
      questioninsortportion2schema: this.fb.array([]),
      questioninsortportion3schema: this.fb.array([]),
      questioninlongportion1schema: this.fb.array([]),
      questioninlongportion2schema: this.fb.array([]),
      questioninlongportion3schema: this.fb.array([]),
      questioninlongportion4schema: this.fb.array([]),
      questioninlongportion5schema: this.fb.array([]),
      questioninlongportion6schema: this.fb.array([]),
      schemaname: [''],
    });
  }

  // onSubmit() {
  //   if (!this.form.value.classname) {
  //     this.msg.error('Please select a class.')
  //   } else if (!this.form.value.bookname) {
  //     this.msg.error('Please select a Book.')
  //   } else if (!this.form.value.testtype) {
  //     this.msg.error('Please select a test type.')
  //   } else if (this.form.value.testtype === 'Select Chapter' && this.form.value.chapternames?.length === 0) {
  //     this.msg.error('Please select chapters.');
  //   } else if (!this.form.value.portions && !this.form.value.longportions) {
  //     this.msg.error('Please select short or long portion.');
  //   } else if ((this.form.value.portions === '1' || this.form.value.portions === '2' || this.form.value.portions === '3') && !this.form.value.questioninsortportion1) {
  //     this.msg.error('Please enter  question in short portion one.')
  //   } else if ((this.form.value.portions === '2' || this.form.value.portions === '3') && !this.form.value.questioninsortportion2) {
  //     this.msg.error('Please enter  question in short portion two.')
  //   } else if (this.form.value.portions === '3' && !this.form.value.questioninsortportion3) {
  //     this.msg.error('Please enter  question in short portion two.')
  //   } else if (this.form.value.choiceinsortportion1&&  this.form.value.choiceinsortportion1 >= this.form.value.questioninsortportion1) {
  //     this.msg.error('Please correct choice in short portion one.')
  //   } else if (this.form.value.choiceinsortportion2 && this.form.value.choiceinsortportion2 >= this.form.value.questioninsortportion2) {
  //     this.msg.error('Please correct choice in short portion two.')
  //   } else if (this.form.value.choiceinsortportion3 > this.form.value.questioninsortportion3) {
  //     this.msg.error('Please correct choice in short portion three.')
  //   } else if ((this.form.value.longportions === '1' || this.form.value.longportions === '2' || this.form.value.longportions === '3' ||
  //     this.form.value.longportions === '4' || this.form.value.longportions === '5' || this.form.value.longportions === '6') && !this.form.value.longquestion1) {
  //     this.msg.error('Please enter  question in long portion one.')
  //   } else if ((this.form.value.longportions === '2' || this.form.value.longportions === '3' ||
  //     this.form.value.longportions === '4' || this.form.value.longportions === '5' || this.form.value.longportions === '6') && !this.form.value.longquestion2) {
  //     this.msg.error('Please enter  question in long portion two.')
  //   } else if ((this.form.value.longportions === '3' ||
  //     this.form.value.longportions === '4' || this.form.value.longportions === '5' || this.form.value.longportions === '6') && !this.form.value.longquestion3) {
  //     this.msg.error('Please enter  question in long portion three.')
  //   } else if ((this.form.value.longportions === '4' || this.form.value.longportions === '5' || this.form.value.longportions === '6') && !this.form.value.longquestion4) {
  //     this.msg.error('Please enter  question in long portion four.')
  //   } else if ((this.form.value.longportions === '5' || this.form.value.longportions === '6') && !this.form.value.longquestion5) {
  //     this.msg.error('Please enter  question in long portion five.')
  //   } else if (this.form.value.longportions === '6' && !this.form.value.longquestion6) {
  //     this.msg.error('Please enter  question in long portion six.')
  //   } else if (this.form.value.questioninsortportion1schema&&this.form.value.questioninsortportion1&&!this.calculationSelectedNumbering(this.form.value.questioninsortportion1schema, this.form.value.questioninsortportion1)) {
  //     this.msg.error('Please enter  correctly schema in short portion one.')
  //   } else if (this.form.value.questioninsortportion2schema&& this.form.value.questioninsortportion2&&!this.calculationSelectedNumbering(this.form.value.questioninsortportion2schema, this.form.value.questioninsortportion2)) {
  //     this.msg.error('Please enter  correctly schema in short portion two.')
  //   } else if (this.form.value.questioninsortportion3schema&& this.form.value.questioninsortportion3&&!this.calculationSelectedNumbering(this.form.value.questioninsortportion3schema, this.form.value.questioninsortportion3)) {
  //     this.msg.error('Please enter  correctly schema in short portion three.')
  //   } else if (this.form.value.questioninlongportion1schema&& this.form.value.longquestion1&&!this.calculationSelectedNumbering(this.form.value.questioninlongportion1schema, this.form.value.longquestion1)) {
  //     this.msg.error('Please enter  correctly schema in long portion one.')
  //   } else if (this.form.value.questioninlongportion2schema&& this.form.value.longquestion2&&!this.calculationSelectedNumbering(this.form.value.questioninlongportion2schema, this.form.value.longquestion2)) {
  //     this.msg.error('Please enter  correctly schema in long portion two.')
  //   } else if (this.form.value.questioninlongportion3schema&& this.form.value.longquestion3&&!this.calculationSelectedNumbering(this.form.value.questioninlongportion3schema, this.form.value.longquestion3)) {
  //     this.msg.error('Please enter  correctly schema in long portion three.')
  //   } else if (this.form.value.longquestion4&&!this.calculationSelectedNumbering(this.form.value.questioninlongportion4schema, this.form.value.longquestion4)) {
  //     this.msg.error('Please enter  correctly schema in long portion four.')
  //   } else if (this.form.value.longquestion5&&!this.calculationSelectedNumbering(this.form.value.questioninlongportion5schema, this.form.value.longquestion5)) {
  //     this.msg.error('Please enter  correctly schema in long portion five.')
  //   } else if (this.form.value.longquestion5&&!this.calculationSelectedNumbering(this.form.value.questioninlongportion6schema, this.form.value.longquestion6)) {
  //     this.msg.error('Please enter  correctly schema in long portion six.')
  //   } else if (!this.form.value.schemaname || this.form.value.schemaname?.length < 5) {
  //     this.msg.error('Please enter correctly schema schema name minimun five length .')
  //   } else {
  //     console.log(this.form.value);
  //   }
  // }
  onSubmit() {
    const formValue = this.form.value;
    switch (true) {
      case !formValue.classname:
        this.msg.error('Please select a class.');
        break;
      case !formValue.bookname:
        this.msg.error('Please select a Book.');
        break;
      case !formValue.testtype:
        this.msg.error('Please select a test type.');
        break;
      case formValue.testtype === 'Select Chapter' && !formValue.chapternames?.length:
        this.msg.error('Please select chapters.');
        break;
      case !formValue.portions && !formValue.longportions:
        this.msg.error('Please select short or long portion.');
        break;
      case (formValue.portions === '1' || formValue.portions === '2' || formValue.portions === '3') && !formValue.questioninsortportion1:
        this.msg.error('Please enter question in short portion one.');
        break;
      case (formValue.portions === '2' || formValue.portions === '3') && !formValue.questioninsortportion2:
        this.msg.error('Please enter question in short portion two.');
        break;
      case formValue.portions === '3' && !formValue.questioninsortportion3:
        this.msg.error('Please enter question in short portion three.');
        break;
      case formValue.choiceinsortportion1 && formValue.choiceinsortportion1 >= formValue.questioninsortportion1:
        this.msg.error('Please correct choice in short portion one.');
        break;
      case formValue.choiceinsortportion2 && formValue.choiceinsortportion2 >= formValue.questioninsortportion2:
        this.msg.error('Please correct choice in short portion two.');
        break;
      case formValue.choiceinsortportion3 > formValue.questioninsortportion3:
        this.msg.error('Please correct choice in short portion three.');
        break;
      case (formValue.longportions === '1' || formValue.longportions === '2' || formValue.longportions === '3') && !formValue.longquestion1:
        this.msg.error('Please enter question in long portion one.');
        break;
      case (formValue.longportions === '2' || formValue.longportions === '3') && !formValue.longquestion2:
        this.msg.error('Please enter question in long portion two.');
        break;
      case (formValue.longportions === '3' || formValue.longportions === '4' || formValue.longportions === '5' || formValue.longportions === '6') && !formValue.longquestion3:
        this.msg.error('Please enter question in long portion three.');
        break;
      case (formValue.longportions === '4' || formValue.longportions === '5' || formValue.longportions === '6') && !formValue.longquestion4:
        this.msg.error('Please enter question in long portion four.');
        break;
      case (formValue.longportions === '5' || formValue.longportions === '6') && !formValue.longquestion5:
        this.msg.error('Please enter question in long portion five.');
        break;
      case formValue.longportions === '6' && !formValue.longquestion6:
        this.msg.error('Please enter question in long portion six.');
        break;
      case formValue.questioninsortportion1schema && formValue.questioninsortportion1 && !this.calculationSelectedNumbering(formValue.questioninsortportion1schema, formValue.questioninsortportion1):
        this.msg.error('Please enter correctly schema in short portion one.');
        break;
      case formValue.questioninsortportion2schema && formValue.questioninsortportion2 && !this.calculationSelectedNumbering(formValue.questioninsortportion2schema, formValue.questioninsortportion2):
        this.msg.error('Please enter correctly schema in short portion two.');
        break;
      case formValue.questioninsortportion3schema && formValue.questioninsortportion3 && !this.calculationSelectedNumbering(formValue.questioninsortportion3schema, formValue.questioninsortportion3):
        this.msg.error('Please enter correctly schema in short portion three.');
        break;
      case formValue.questioninlongportion1schema && formValue.longquestion1 && !this.calculationSelectedNumbering(formValue.questioninlongportion1schema, formValue.longquestion1):
        this.msg.error('Please enter correctly schema in long portion one.');
        break;
      case formValue.questioninlongportion2schema && formValue.longquestion2 && !this.calculationSelectedNumbering(formValue.questioninlongportion2schema, formValue.longquestion2):
        this.msg.error('Please enter correctly schema in long portion two.');
        break;
      case formValue.questioninlongportion3schema && formValue.longquestion3 && !this.calculationSelectedNumbering(formValue.questioninlongportion3schema, formValue.longquestion3):
        this.msg.error('Please enter correctly schema in long portion three.');
        break;
      case formValue.longquestion4 && !this.calculationSelectedNumbering(formValue.questioninlongportion4schema, formValue.longquestion4):
        this.msg.error('Please enter correctly schema in long portion four.');
        break;
      case formValue.longquestion5 && !this.calculationSelectedNumbering(formValue.questioninlongportion5schema, formValue.longquestion5):
        this.msg.error('Please enter correctly schema in long portion five.');
        break;
      case formValue.longquestion6 && !this.calculationSelectedNumbering(formValue.questioninlongportion6schema, formValue.longquestion6):
        this.msg.error('Please enter correctly schema in long portion six.');
        break;
      case !formValue.schemaname || formValue.schemaname.length < 5:
        this.msg.error('Please enter correctly schema name minimum five length.');
        break;
      default:
        console.log(formValue);
    }
  }
  calculationSelectedNumbering(dataArray: any[], maximumNumber: string | number): boolean {
    const maxNumber = typeof maximumNumber === 'string' ? Number(maximumNumber) : maximumNumber;
    let total = 0;
    for (const element of dataArray) {
      if (!element.chaptername || !element.questiontype || !element.questionquantity || element.questionquantity === 0) {
        return false;
      }
      const questionQuantity = typeof element.questionquantity === 'string'
        ? Number(element.questionquantity)
        : element.questionquantity || 0;
      total += questionQuantity;
    }
    if (total === maxNumber) {
      return true
    } else {
      return false
    }
  }







  ngAfterViewInit(): void {
    this.addChapter1schema();
    this.addChapter2schema();
    this.addChapter3schema();
    this.addlongquestionschema1();
    this.addlongquestionschema2();
    this.addlongquestionschema3();
    this.addlongquestionschema4();
    this.addlongquestionschema5();
    this.addlongquestionschema6();
    this.getdata();
    this.form.get('testtype')?.valueChanges.subscribe((value: any) => {
      this.updateValidators1(value);
    });
    this.form.get('chapternames')?.valueChanges.subscribe((value: any) => {
      this.updatechapters(value);
    });
  }
  get questioninsortportion1schema() {
    return this.form.get('questioninsortportion1schema') as FormArray;
  }
  addChapter1schema() {
    const chapterGroup = this.fb.group({
      uid: [uuidv4()],
      chaptername: [''],
      questiontype: [''],
      questionquantity: [0],
    });
    this.questioninsortportion1schema.push(chapterGroup);
  }
  removeChapter1schema(index: number) {
    this.questioninsortportion1schema.removeAt(index);
  }
  get questioninsortportion2schema() {
    return this.form.get('questioninsortportion2schema') as FormArray;
  }
  addChapter2schema() {
    const chapterGroup = this.fb.group({
      uid: [uuidv4()],
      chaptername: [''],
      questiontype: [''],
      questionquantity: [0],
    });
    this.questioninsortportion2schema.push(chapterGroup);
  }
  removeChapter2schema(index: number) {
    this.questioninsortportion2schema.removeAt(index);
  }
  get questioninsortportion3schema() {
    return this.form.get('questioninsortportion3schema') as FormArray;
  }
  addChapter3schema() {
    const chapterGroup = this.fb.group({
      uid: [uuidv4()],
      chaptername: [''],
      questiontype: [''],
      questionquantity: [0],
    });
    this.questioninsortportion3schema.push(chapterGroup);
  }
  removeChapter3schema(index: number) {
    this.questioninsortportion3schema.removeAt(index);
  }







  get questioninlongportion1schema() {
    return this.form.get('questioninlongportion1schema') as FormArray;
  }
  addlongquestionschema1() {
    const chapterGroup = this.fb.group({
      uid: [uuidv4()],
      chaptername: [''],
      questiontype: [''],
      questionquantity: [0],
    });
    this.questioninlongportion1schema.push(chapterGroup);
  }
  removelongquestionschema1(index: number) {
    this.questioninlongportion1schema.removeAt(index);
  }
  get questioninlongportion2schema() {
    return this.form.get('questioninlongportion2schema') as FormArray;
  }
  addlongquestionschema2() {
    const chapterGroup = this.fb.group({
      uid: [uuidv4()],
      chaptername: [''],
      questiontype: [''],
      questionquantity: [0],
    });
    this.questioninlongportion2schema.push(chapterGroup);
  }
  removelongquestionschema2(index: number) {
    this.questioninlongportion2schema.removeAt(index);
  }
  get questioninlongportion3schema() {
    return this.form.get('questioninlongportion3schema') as FormArray;
  }
  addlongquestionschema3() {
    const chapterGroup = this.fb.group({
      uid: [uuidv4()],
      chaptername: [''],
      questiontype: [''],
      questionquantity: [0],
    });
    this.questioninlongportion3schema.push(chapterGroup);
  }
  removelongquestionschema3(index: number) {
    this.questioninlongportion3schema.removeAt(index);
  }
  get questioninlongportion4schema() {
    return this.form.get('questioninlongportion4schema') as FormArray;
  }
  addlongquestionschema4() {
    const chapterGroup = this.fb.group({
      uid: [uuidv4()],
      chaptername: [''],
      questiontype: [''],
      questionquantity: [0],
    });
    this.questioninlongportion4schema.push(chapterGroup);
  }
  removelongquestionschema4(index: number) {
    this.questioninlongportion4schema.removeAt(index);
  }
  get questioninlongportion5schema() {
    return this.form.get('questioninlongportion5schema') as FormArray;
  }
  addlongquestionschema5() {
    const chapterGroup = this.fb.group({
      uid: [uuidv4()],
      chaptername: [''],
      questiontype: [''],
      questionquantity: [0],
    });
    this.questioninlongportion5schema.push(chapterGroup);
  }
  removelongquestionschema5(index: number) {
    this.questioninlongportion5schema.removeAt(index);
  }
  get questioninlongportion6schema() {
    return this.form.get('questioninlongportion6schema') as FormArray;
  }
  addlongquestionschema6() {
    const chapterGroup = this.fb.group({
      uid: [uuidv4()],
      chaptername: [''],
      questiontype: [''],
      questionquantity: [0],
    });
    this.questioninlongportion6schema.push(chapterGroup);
  }
  removelongquestionschema6(index: number) {
    this.questioninlongportion6schema.removeAt(index);
  }











  selecttedchapters: any
  updatechapters(value: any) {
    if (value?.length > 0) {
      this.selecttedchapters = this.Chapters.filter((item: { uid: any; }) => value.includes(item.uid))
    }
  }
  updateValidators1(type: string): void {
    if (type === 'Select Chapter') {
    } else {
      this.selecttedchapters = this.Chapters
    }
  }

  // updateValidators(portions: string): void {
  //   this.form.get('statement1')?.clearValidators();
  //   this.form.get('statement2')?.clearValidators();
  //   this.form.get('statement3')?.clearValidators();
  //   if (portions === '1') {
  //     this.form.get('statement1')?.setValidators([Validators.required]);
  //   } else if (portions === '2') {
  //     this.form.get('statement1')?.setValidators([Validators.required]);
  //     this.form.get('statement2')?.setValidators([Validators.required]);
  //   } else if (portions === '3') {
  //     this.form.get('statement1')?.setValidators([Validators.required]);
  //     this.form.get('statement2')?.setValidators([Validators.required]);
  //     this.form.get('statement3')?.setValidators([Validators.required]);
  //   }
  //   this.form.get('statement1')?.updateValueAndValidity();
  //   this.form.get('statement2')?.updateValueAndValidity();
  //   this.form.get('statement3')?.updateValueAndValidity();

  // }
  istrueoptionvalid: any = {}
  inputsize: any = 'large'
  getdata() {
    try {
      this.dbservice.get('classes').subscribe((res: any) => {
        console.log(res);
        this.classes = this.sortClasses(res)
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
  bookid: any
  getbooks(id: any) {
    console.log(id);
    this.bookid = id
    try {
      this.dbservice.getbyid('books', id).subscribe((res) => {
        console.log(res);
        this.Books = res
      })
    } catch (error) {
      console.log(error);
    }
  }
  chapterids = {

  }
  getchapters(id: any): void {
    let chapterids = {
      ClassName: this.bookid,
      BookName: id
    }
    this.dbservice.getallwithdata('chapters/books', chapterids)
      .subscribe({
        next: (res: any) => {
          if (res && res['0'] && res['0'].chapters) {
            this.Chapters = res['0'].chapters;
            console.log(this.Chapters);
          } else {
            console.log(res)
            this.Chapters = res
          }
        },
        error: (error: any) => {
          console.error('Error fetching chapters:', error);
        }
      });
  }
  classes: any = []
  Books: any = []
  Chapters: any = []










}
