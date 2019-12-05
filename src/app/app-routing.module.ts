import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ListComponent } from './category/list/list.component';
import { ItemComponent } from './category/list/item/item.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FormCategoryComponent } from './category/form-category/form-category.component';
import { FormListComponent } from './category/list/form-list/form-list.component';
import { FormItemComponent } from './category/list/item/form-item/form-item.component';

const routes: Routes = [
  { path: '', redirectTo: '/categories', pathMatch: 'full' },
  { path: 'categories', component: CategoryComponent },
  { path: 'categories/new', component: FormCategoryComponent },
  { path: 'categories/:idCategory/edit', component: FormCategoryComponent },
  { path: 'categories/:idCategory/lists', component: ListComponent },
  { path: 'categories/:idCategory/lists/new', component: FormListComponent  },
  { path: 'categories/:idCategory/lists/:idList/edit', component: FormListComponent  },
  { path: 'categories/:idCategory/lists/:idList/items', component: ItemComponent },
  { path: 'categories/:idCategory/lists/:idList/items/new', component: FormItemComponent},
  { path: 'categories/:idCategory/lists/:idList/items/:idItem/edit', component: FormItemComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
