import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Title } from '@angular/platform-browser';

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
    title = 'List of categories';
    public categories: Category[];

    constructor(private titleService: Title, 
        private categoriesService: CategoriesService,
        private navController: NavController, 
        private navParams: NavParams,
        public events: Events){
        this.titleService.setTitle(this.title);
        this.events.subscribe('new:category', (category) => {
            this.addCategory(category);
        });
        this.events.subscribe('delete:category', (category) => {
            this.deleteCategory(category);
        });
    }

    ngOnInit() { 
        this.loadCategories();
    }

    loadCategories() {
        this.categoriesService.getCategories().subscribe(
            data => { this.categories = data },
            err => console.log(err),
            () => console.log(this.categories)
        );
    }

    editCategory(category: Category){
        this.navController.push(CategoriesFormComponent, {
            category: category
        });
    }

    newCategory(){
        this.navController.push(CategoriesFormComponent, {
            category: new Category(0, "")
        });
    }

    addCategory(category: Category) {
        this.categories.push(category);
    }

    deleteCategory(category: Category) {
        console.log('hey');
        //console.log(this.categories.findIndex(item => item.id === category.id));
        let index: number = this.categories.indexOf(category);
        if (index !== -1) {
            this.categories.splice(index, 1);
        }  
    }
}