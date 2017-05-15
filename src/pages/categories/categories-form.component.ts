import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Category, CategoriesComponent } from './categories.component';
import { CategoriesService } from './categories-service';

@Component({
    selector: 'page-categories-form',
    templateUrl: './categories-form.component.html',
    providers: [ CategoriesService ]
})

export class CategoriesFormComponent { 
    title = 'New Category';

    modCategory: Category;
    catForm: FormGroup;
    catLabel = new FormControl("", Validators.required);

    constructor(private titleService: Title, 
        private categoriesService: CategoriesService,
        private fb: FormBuilder,
        private navController: NavController, 
        private navParams: NavParams,
        public events: Events){
        this.titleService.setTitle(this.title);
        this.catForm = this.fb.group({
            label: this.catLabel,
        });
    }

    ngOnInit() {
        this.createForm();
    }

    newCategory(cat: Category) {
        this.categoriesService.newCategory(cat).subscribe(
            data => { console.log(data) },
            err => console.log(err)
        );
    }

    editCategory(cat: Category) {
        this.categoriesService.editCategory(cat).subscribe(
            data => { console.log(data) },
            err => console.log(err)
        );
    }

    deleteCategory(id: number) {
        this.categoriesService.deleteCategory(id).subscribe(
            data => { console.log(data) },
            err => console.log(err)
        );
    }

    createForm() {
        if (this.navParams.get('category')) {
            this.titleService.setTitle('Edit Category');
            this.modCategory = this.navParams.get('category');
            //console.log(this.navParams.get('category'));
            this.catForm.setValue({
                label: this.modCategory.label,
            })
        }
    }

    saveCategory() {
        //console.log(this.catForm.value.label);
        this.modCategory.label = this.catForm.value.label;
        if(this.modCategory.id == 0){
            this.newCategory(this.modCategory);
            this.events.publish('new:category', this.modCategory);        
        } else {
            this.editCategory(this.modCategory);
        }
    }

    delCategory() {
        this.events.publish('delete:category', this.modCategory);
    }
}