import { Component, OnInit } from '@angular/core';
import { Category } from '../category';
import { CategoryService } from '../category.service';
import { Router, ActivatedRoute } from '@angular/router';
import Utils from '../../../utils';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css']
})

export class FormCategoryComponent implements OnInit {

  public pageLoaded: boolean = false;
  public category: Category;
  public idCategory: string;
  public formAvaliable: boolean = true;
  public isUpdated: boolean;

  constructor(private _categoryService: CategoryService, private _router: Router, private _activedRoute: ActivatedRoute) { }

  private insert(): void {

    this._categoryService.insert(this.category).subscribe(response => {

      this._router.navigate(['/categories', response.id, 'lists'], {
        queryParams: { category: response.name }
      });

      Utils.notify('success', 'A tarefa foi cadastrada com sucesso!');

    }, () => {

      Utils.notify('error');

    });

  }

  private update(): void {

    this._categoryService.update(this.idCategory, this.category).subscribe(() => {

      this._router.navigate(['/categories']);

      Utils.notify('success', 'A tarefa foi alterada com sucesso!');

    }, () => {

      Utils.notify('error');

    });

  }

  private getCategory(idCategory: string): void {

    this._categoryService.get(idCategory)
      .subscribe(response => {

        this.category = new Category(
          response.id,
          response.name
        );

        this.pageLoaded = true;

      }, () => {

        this.formAvaliable = false;
        this.pageLoaded = true;

      });
  }

  private delete(): void {

    this._categoryService.delete(this.idCategory).subscribe(() => {

      this._router.navigate(['/categories']);

      Utils.notify('success', 'A tarefa foi excluida com sucesso!');

    }, () => {

      Utils.notify('error');

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

    const confirm = window.confirm("Gostaria realmente de remover essa tarefa?");

    if (confirm) {
      this.delete();
    }

  }

  ngOnInit() {

    this.category = new Category("", "");
    this.idCategory = this._activedRoute.snapshot.paramMap.get('idCategory');

    if (this.idCategory) {

      this.isUpdated = true;
      this.getCategory(this.idCategory);

    } else {

      this.isUpdated = false;
      this.pageLoaded = true;

    }

  }

}
