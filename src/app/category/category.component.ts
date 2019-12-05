import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Category } from './category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: []
})

export class CategoryComponent implements OnInit {

  constructor(private categoryService: CategoryService) { }

  public categories: Category[];
  public existsCategories = true;

  ngOnInit() {

    this.categoryService.getAll().subscribe(response => {

      if (response && !response.length) {
        this.existsCategories = false;
        return;
      }

      this.categories = response.map(item => {
        return new Category(
          item.id,
          item.name
        );
      }).reverse();

    }, () => {

      this.existsCategories = false;

    });

  }

}
