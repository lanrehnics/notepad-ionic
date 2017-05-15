import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NotesComponent } from '../pages/notes/notes.component';
import { NotesFormComponent } from '../pages/notes/notes-form.component';

import { CategoriesComponent } from '../pages/categories/categories.component';
import { CategoriesFormComponent } from '../pages/categories/categories-form.component';

@Component({
    templateUrl: 'app.html'
})
export class NotepadApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = NotesComponent;

    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen) {
        this.initializeApp();

        this.pages = [
            { title: 'Notes', component: NotesComponent },
            { title: 'Categories', component: CategoriesComponent },
            { title: 'New Note', component: NotesFormComponent },
            { title: 'New Category', component: CategoriesFormComponent }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}
