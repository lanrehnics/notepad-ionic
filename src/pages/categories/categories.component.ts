import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';

import { CategoriesFormComponent } from './categories-form.component';
import { CategoriesService } from './categories-service';

export class Category {
    id: number;
    label: string;
    constructor(id: number, label: string) {
        this.id = id;
        this.label = label;
    }
}

@Component({
    selector: 'pages-categories',
    templateUrl: './categories.component.html',
    providers: [ CategoriesService ]
})

export class CategoriesComponent  { 
    result: string;
    public categories: Category[];

    constructor(private categoriesService: CategoriesService,
        private navController: NavController, 
        private navParams: NavParams,
        private toastCtrl: ToastController,
        public events: Events){
    }

    ngOnInit() { 
        this.loadCategories();
        this.events.subscribe('result', (result) => {
            this.result = result;
            this.loadCategories();
            this.presentToast();
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

    newCategory(){
        this.navController.push(CategoriesFormComponent);
    }

    editCategory(category: Category){
        this.navController.push(CategoriesFormComponent, {
            category: category
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