import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import Utils from '../../../utils';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: []
})

export class FormCategoryComponent implements OnInit {

  public pageLoaded = false;
  public category: Category;
  public idCategory: string;
  public formAvaliable = true;
  public isUpdated: boolean;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) { }

  private insert(): void {

    this.categoryService.insert(this.category).subscribe(response => {

      this.router.navigate(
        [
          '/categories', response.id, 'lists'
        ],
        {
          queryParams: {
            category: response.name
          }
        }
      );

      Utils.notify('success', 'A tarefa foi cadastrada com sucesso!');

    }, (err) => {

      Utils.notify('error', err.error);

    });

  }

  private update(): void {

    this.categoryService.update(this.idCategory, this.category).subscribe(() => {

      this.router.navigate(['/categories']);

      Utils.notify('success', 'A tarefa foi alterada com sucesso!');

    }, (err) => {

      Utils.notify('error', err.error);

    });

  }

  private getCategory(idCategory: string): void {

    this.categoryService.get(idCategory).subscribe(response => {

      const { id, name } = response;

      this.category = new Category(
        id,
        name
      );

      this.pageLoaded = true;

    }, () => {

      this.formAvaliable = false;
      this.pageLoaded = true;

    });
  }

  private delete(): void {

    this.categoryService.delete(this.idCategory).subscribe(() => {

      this.router.navigate(['/categories']);

      Utils.notify('success', 'A tarefa foi excluída com sucesso!');

    }, (err) => {

      Utils.notify('error', err.error);

    });

  }

  onSubmit(): void {

    if (this.isUpdated) {

      this.update();

    } else {

      this.insert();

    }

  }

  onDelete(): void {

    const confirm = window.confirm('Gostaria realmente de remover essa tarefa?');

    if (confirm) {

      this.delete();

    }

  }

  ngOnInit() {

    this.category = new Category('', '');
    this.idCategory = this.activedRoute.snapshot.paramMap.get('idCategory');

    if (this.idCategory) {

      this.isUpdated = true;
      this.getCategory(this.idCategory);

    } else {

      this.isUpdated = false;
      this.pageLoaded = true;

    }

  }

}
