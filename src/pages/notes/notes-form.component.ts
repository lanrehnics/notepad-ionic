import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Note, NotesComponent } from './notes.component';
import { Category } from '../categories/categories.component';
import { CategoriesService } from '../categories/categories-service';
import { NotesService } from './notes-service';

@Component({
    selector: 'page-notes-form',
    templateUrl: './notes-form.component.html',
    providers: [ NotesService, CategoriesService ]
})

export class NotesFormComponent { 
    public categories: Category[];
    modNote: Note;
    result: string;
    noteForm: FormGroup;
    noteTitle = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4)]));
    noteContent = new FormControl("", Validators.required);
    noteCategory = new FormControl(new Category(0, ''), Validators.required);

    constructor(private notesService: NotesService,
        private categoriesService: CategoriesService,
        private fb: FormBuilder,
        private navController: NavController, 
        private navParams: NavParams,
        private toastCtrl: ToastController,
        public events: Events){
        this.modNote = new Note(0, "", "", new Category(0, ""));
        this.noteForm = this.fb.group({
            title: this.noteTitle,
            content: this.noteContent,
            category: this.noteCategory,
        });
    }

    ngOnInit() {
        this.loadCategories();
        this.createForm();
    }

    createForm() {
        if (this.navParams.get('note')) {
            this.modNote = this.navParams.get('note');
        }
        this.noteForm.setValue({
            title: this.modNote.title,
            content: this.modNote.content,
            category: this.modNote.category,
        });
    }

    loadCategories() {
        this.categoriesService.getCategories().subscribe(
            data => { 
                if(data.hasOwnProperty('error')) {
                    this.result = "There is no Categories yet."
                } else {
                    this.categories = data;
                }
            },
            err => this.result = "Cannot fetch Categories. Please verify your internet connection."
        );
    }

    newNote(note: Note) {
        this.notesService.newNote(note).subscribe(
            data => { 
                if(data.success) {
                    this.result = "Note added successfuly!";
                    this.events.publish('result', this.result);
                    if(this.navController.canGoBack()) {
                        this.navController.pop();
                    } else {
                        this.navController.push(NotesComponent);
                    }
                } else if(data.failure) {
                    this.result = "Note has not been added, please try again.";
                    this.presentToast();
                } 
            },
            err => console.log(err)
        );
    }

    editNote(note: Note) {
        this.notesService.editNote(note).subscribe(
            data => { 
                if(data.success) {
                    this.result = "Note edited successfuly!";
                    this.events.publish('result', this.result);
                    if(this.navController.canGoBack()) {
                        this.navController.pop();
                    } else {
                        this.navController.push(NotesComponent);
                    }
                } else if(data.failure) {
                    this.result = "Note has not been edited, please try again.";
                    this.presentToast();
                }
            },
            err => { 
                if(err.hasOwnProperty('error')) {
                    this. result = "Cannot find Note."
                    this.presentToast();
                }
            });
    }

    deleteNote(id: number) {
        this.notesService.deleteNote(id).subscribe(
            data => { 
                if(data.success) {
                    this.result = "Note deleted successfuly!";
                    this.events.publish('result', this.result);
                    if(this.navController.canGoBack()) {
                        this.navController.pop();
                    } else {
                        this.navController.push(NotesComponent);
                    }
                } else if(data.failure) {
                    this.result = "Note has not been delete, please try again.";
                    this.presentToast();
                } 
            },
            err => { 
                if(err.hasOwnProperty('error')) {
                    this. result = "Cannot find Note."
                    this.presentToast();
                }
            });
    }

    saveNote() {
        let modCat: Category;
        modCat = this.categories.find(category => category.id === this.noteForm.value.category);
        this.modNote.title = this.noteForm.value.title;
        this.modNote.content = this.noteForm.value.content;
        this.modNote.category = modCat;
        if(this.modNote.id == 0){
            this.newNote(this.modNote);     
        } else {
            this.editNote(this.modNote);
        }
    }

    delNote() {
        this.deleteNote(this.modNote.id);
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