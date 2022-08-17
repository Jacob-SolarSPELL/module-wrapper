import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CategoryDataResolver, FilesDataResolver, SearchDataResolver } from './data.service';
import { FilesComponent } from './files/files.component';
import { HomeComponent } from './home/home.component';
import { SearchAllComponent } from './search-all/search-all.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';

const routes: Routes = [
  {path:'about', component: AboutComponent},
  {path:'home', component: HomeComponent},
  {path: '', component:HomeComponent},
  {
    path: 'category/:parent_id',
    component: SubcategoryComponent,
    resolve: { categoryData: CategoryDataResolver }
  },
  {
    path: 'files/:parent_id',
    component: FilesComponent,
    resolve: { filesData: FilesDataResolver }
  },
  {
    path: 'search',
    component: SearchAllComponent,
    resolve: { filesData: SearchDataResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
