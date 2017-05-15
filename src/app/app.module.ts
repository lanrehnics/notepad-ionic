import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NotepadApp } from './app.component';
import { CategoriesComponent } from '../pages/categories/categories.component';
import { CategoriesFormComponent } from '../pages/categories/categories-form.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    NotepadApp,
    CategoriesComponent,
    CategoriesFormComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(NotepadApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    NotepadApp,
    CategoriesComponent,
    CategoriesFormComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
