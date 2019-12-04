import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private _categoryService: CategoryService) { }
  public categories: Category[];
  public existsCategories: boolean = true;

  ngOnInit() {

    this._categoryService.getAll().subscribe(response => {

        if(response && !response.length) {
          this.existsCategories = false;
          return;
        }

        this.categories = response.map(item => {
          return new Category(
            item.id,
            item.name
          )
        });

        console.log("this.categories", this.categories)
      }
    )
  }

}
