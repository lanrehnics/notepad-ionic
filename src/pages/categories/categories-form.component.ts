import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { Category, CategoriesComponent } from './categories.component';
import { CategoriesService } from './categories-service';

@Component({
    selector: 'page-categories-form',
    templateUrl: './categories-form.component.html',
    providers: [ CategoriesService ]
})

export class CategoriesFormComponent {
    modCategory: Category;
    result: string;
    catForm: FormGroup;
    catLabel = new FormControl("", Validators.required);

    constructor(private categoriesService: CategoriesService,
        private fb: FormBuilder,
        private navController: NavController, 
        private navParams: NavParams,
        private toastCtrl: ToastController,
        public events: Events){
        this.modCategory = new Category(0, "");
        this.catForm = this.fb.group({
            label: this.catLabel,
        });
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        if (this.navParams.get('category')) {
            this.modCategory = this.navParams.get('category');
        }
        this.catForm.setValue({
            label: this.modCategory.label,
        })
    }

    newCategory(cat: Category) {
        this.categoriesService.newCategory(cat).subscribe(
            data => { 
                if(data.success) {
                    this.result = "Category added successfuly!";
                    this.events.publish('result', this.result);
                    if(this.navController.canGoBack()) {
                        this.navController.pop();
                    } else {
                        this.navController.push(CategoriesComponent);
                    }
                } else if(data.failure) {
                    this.result = "Category has not been added, please try again.";
                    this.presentToast();
                } 
            },
            err => console.log(err)
        );
    }

    editCategory(cat: Category) {
        this.categoriesService.editCategory(cat).subscribe(
            data => { 
                if(data.success) {
                    this.result = "Category edited successfuly!";
                    this.events.publish('result', this.result);
                    if(this.navController.canGoBack()) {
                        this.navController.pop();
                    } else {
                        this.navController.push(CategoriesComponent);
                    }
                } else if(data.failure) {
                    this.result = "Category has not been edited, please try again.";
                    this.presentToast();
                }
            },
            err => { 
                if(err.hasOwnProperty('error')) {
                    this. result = "Cannot find Category."
                    this.presentToast();
                }
            });
    }

    deleteCategory(id: number) {
        this.categoriesService.deleteCategory(id).subscribe(
            data => { 
                if(data.success) {
                    this.result = "Category deleted successfuly!";
                    this.events.publish('result', this.result);
                    if(this.navController.canGoBack()) {
                        this.navController.pop();
                    } else {
                        this.navController.push(CategoriesComponent);
                    }
                } else if(data.failure) {
                    this.result = "Category has not been delete, please try again.";
                    this.presentToast();
                } 
            },
            err => { 
                if(err.hasOwnProperty('error')) {
                    this. result = "Cannot find Category."
                    this.presentToast();
                }
            });
    }

    saveCategory() {
        this.modCategory.label = this.catForm.value.label;
        if(this.modCategory.id == 0){
            this.newCategory(this.modCategory);     
        } else {
            this.editCategory(this.modCategory);
        }
    }

    delCategory() {
        this.deleteCategory(this.modCategory.id);
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