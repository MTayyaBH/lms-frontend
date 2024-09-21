import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LMSComponent } from './lms/lms.component';
import { NineclassComponent } from './nineclass/nineclass.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OnlineTestComponent } from './online-test/online-test.component';
import { ChemistryComponent } from './chemistry/chemistry.component';
import { StarttestComponent } from './starttest/starttest.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AdminmcqsComponent } from './adminmcqs/adminmcqs.component';
import { ResultComponent } from './result/result.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { AdminClassesComponent } from './admin-classes/admin-classes.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { AllresultsComponent } from './allresults/allresults.component';
import { AdminComponent } from './admin/admin.component';
import { McqslistComponent } from './mcqslist/mcqslist.component';
import { ClasslistComponent } from './classlist/classlist.component';
import { BooklistComponent } from './booklist/booklist.component';
import { ChapterslistComponent } from './chapterslist/chapterslist.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'LMS', component: LMSComponent },
  { path: 'AboutUs', component: AboutusComponent },
  { path: 'ContactUs', component: ContactUsComponent },
  { path: 'SignUp', component: SignupComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Results', component: AllresultsComponent },
  { path: 'Admin', component: AdminComponent, 
    children:[
      { path: 'AddMcqs', component: AdminmcqsComponent },
      { path: 'EditMCQs', component: AdminmcqsComponent },
      { path: 'MCQsList', component: McqslistComponent },
      { path: 'New-Class', component: AdminClassesComponent },
      { path: 'Update-Class', component: AdminClassesComponent },
      { path: 'Class-List', component: ClasslistComponent },
      { path: 'Books', component: AdminBooksComponent },
      { path: 'Edit-Book', component: AdminBooksComponent },
      { path: 'Books-List', component: BooklistComponent },
      { path: 'Chapters', component: ChaptersComponent },
      { path: 'Chapters-List', component: ChapterslistComponent },
    ]
  },
  { path: 'LMS/OnlineTest', component: OnlineTestComponent },
  { path: 'LMS/OnlineTest/Result', component: ResultComponent },
  { path: 'LMS/OnlineTest/Result-Details', component: QuizResultsComponent },
  { path: 'LMS/OnlineTest/Class', component: NineclassComponent },
  { path: 'LMS/OnlineTest/Class/Book', component: ChemistryComponent },
  { path: 'LMS/OnlineTest/ClassName/BookName/Type', component: StarttestComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
