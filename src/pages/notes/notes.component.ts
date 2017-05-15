import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Title } from '@angular/platform-browser';

import { NotesFormComponent } from './notes-form.component';
import { Category } from '../categories/categories.component';
import { NotesService } from './notes-service';

export class Note {
    id: number;
    title: string;
    content: string;
    category: Category;
    constructor(id: number, title: string, 
        content: string, category: Category) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.category = category;
    }
}

@Component({
    selector: 'pages-notes',
    templateUrl: './notes.component.html',
    providers: [ NotesService ]
})

export class NotesComponent  { 
    title = 'List of Notes';

    result: string;
    public notes: Note[];

    constructor(private titleService: Title, 
        private notesService: NotesService,
        private navController: NavController, 
        private navParams: NavParams,
        private toastCtrl: ToastController){
        this.titleService.setTitle(this.title);
    }

    ngOnInit() { 
        this.loadNotes();
        if (this.navParams.get('result')) {
            this.result = this.navParams.get('result');
            this.presentToast();
        }
    }

    loadNotes() {
        this.notesService.getNotes().subscribe(
            data => { 
                if(data.hasOwnProperty('error')) {
                    this.result = "There is no Notes yet."
                } else {
                    this.notes = data;
                }
            },
            err => this.result = "Cannot fetch Notes. Please verify your internet connection."
        );
    }

    newNote(){
        this.navController.push(NotesFormComponent, {
            note: new Note(0, "", "", new Category(0, ""))
        });
    }

    editNote(note: Note){
        this.navController.push(NotesFormComponent, {
            note: note
        });
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: this.result,
            duration: 3000,
            position: 'bottom'
        });

        toast.present();
    }
}