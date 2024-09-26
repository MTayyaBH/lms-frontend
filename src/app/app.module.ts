import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HomeComponent } from './home/home.component';
import { CardSliderComponent } from './card-slider/card-slider.component';
registerLocaleData(en);
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { LMSComponent } from './lms/lms.component';
import { NineclassComponent } from './nineclass/nineclass.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { OnlineTestComponent } from './online-test/online-test.component';
import { ChemistryComponent } from './chemistry/chemistry.component';
import { StarttestComponent } from './starttest/starttest.component';
import { BooksComponent } from './books/books.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { AdminmcqsComponent } from './adminmcqs/adminmcqs.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ResultComponent } from './result/result.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminClassesComponent } from './admin-classes/admin-classes.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ChaptersComponent } from './chapters/chapters.component';
import { AllresultsComponent } from './allresults/allresults.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DragScrollDirective } from './drag-scroll.directive';
import { AdminComponent } from './admin/admin.component';
import { MenuComponent } from './menu/menu.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { McqslistComponent } from './mcqslist/mcqslist.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { ClasslistComponent } from './classlist/classlist.component';
import { BooklistComponent } from './booklist/booklist.component';
import { ChapterslistComponent } from './chapterslist/chapterslist.component';
import { AddquestionsComponent } from './addquestions/addquestions.component';
import { QuestionslistComponent } from './questionslist/questionslist.component';
import { AutogeneratepaperComponent } from './autogeneratepaper/autogeneratepaper.component';
import { AddpaperschemasComponent } from './addpaperschemas/addpaperschemas.component';
import { SchemaslistComponent } from './schemaslist/schemaslist.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ToggleSwitchComponent,
    HomeComponent,
    CardSliderComponent,
    LMSComponent,
    NineclassComponent,
    AboutusComponent,
    ContactUsComponent,
    OnlineTestComponent,
    ChemistryComponent,
    StarttestComponent,
    BooksComponent,
    LoginComponent,
    SignupComponent,
    AdminmcqsComponent,
    ResultComponent,
    QuizResultsComponent,
    AdminBooksComponent,
    AdminClassesComponent,
    ChaptersComponent,
    AllresultsComponent,
    DragScrollDirective,
    AdminComponent,
    MenuComponent,
    McqslistComponent,
    ClasslistComponent,
    BooklistComponent,
    ChapterslistComponent,
    AddquestionsComponent,
    QuestionslistComponent,
    AutogeneratepaperComponent,
    AddpaperschemasComponent,
    SchemaslistComponent
  ],
  imports: [
    BrowserModule,NzIconModule,NzDrawerModule,NzCarouselModule,NzMessageModule,
    AppRoutingModule,NzSpinModule,NzInputModule,NzDatePickerModule,
    FormsModule,NzSelectModule,NzButtonModule,NzTimePickerModule,
    HttpClientModule,NzUploadModule,NzFormModule,NzSkeletonModule,
    BrowserAnimationsModule,NzListModule,NzToolTipModule,
    IconsProviderModule,NzTableModule,NzPopconfirmModule,
    NzLayoutModule,NzDropDownModule,NzPaginationModule,
    NzMenuModule,ReactiveFormsModule, 
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
