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
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'LMS', component: LMSComponent },
  { path: 'AboutUs', component: AboutusComponent },
  { path: 'ContactUs', component: ContactUsComponent },
  { path: 'SignUp', component: SignupComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Admin/AddMcqs', component: AdminmcqsComponent },
  { path: 'Admin/classes', component: AdminClassesComponent },
  { path: 'Admin/Books', component: AdminBooksComponent },
  { path: 'Admin/Chapters', component: ChaptersComponent },
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
