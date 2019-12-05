import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Utils from '../../../../utils';
import { ListService } from '../list.service';
import { List } from '../list';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: []
})

export class FormListComponent implements OnInit {

  public pageLoaded = false;
  public task: List;
  public idCategory: string;
  public categoryName: string;
  public idList: string;
  public formAvaliable = true;
  public isUpdated: boolean;

  constructor(
    private listService: ListService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {}

  private insert(): void {

    this.listService.insert(this.idCategory, this.task).subscribe(response => {

      this.router.navigate(
        [
          '/categories', this.idCategory,
          'lists', response.id, 'items'
        ],
        {
          queryParams: {
            category: this.categoryName,
            list: response.name
          }
        }
      );

      Utils.notify('success', 'A tarefa foi cadastrada com sucesso!');

    }, (err) => {

      Utils.notify('error', err.error);

    });

  }

  private update(): void {

    this.listService.update(this.idCategory, this.idList, this.task).subscribe(() => {

      this.router.navigate(
        [
          '/categories',
          this.idCategory,
          'lists'
        ],
        {
          queryParams: {
            category: this.categoryName
          }
        }
      );

      Utils.notify('success', 'A tarefa foi alterada com sucesso!');

    }, (err) => {

      Utils.notify('error', err.error);

    });

  }

  private getTask(): void {

    this.listService.get(this.idCategory, this.idList)
      .subscribe(response => {

        this.task = new List(
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

    this.listService.delete(this.idCategory, this.idList).subscribe(() => {

      this.router.navigate(
        [
          '/categories',
          this.idCategory,
          'lists'
        ],
        {
          queryParams: {
            category: this.categoryName
          }
        }
      );

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

    this.task = new List('', '');
    this.idCategory = this.activedRoute.snapshot.paramMap.get('idCategory');
    this.idList = this.activedRoute.snapshot.paramMap.get('idList');

    this.activedRoute.queryParams.subscribe(params => {

        this.categoryName = params.category;

    });

    if (this.idList) {

      this.isUpdated = true;
      this.getTask();

    } else {

      this.isUpdated = false;
      this.pageLoaded = true;

    }

  }

}
