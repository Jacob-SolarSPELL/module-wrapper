import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Subcategory } from './models/subcategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: string;

  constructor(private http: HttpClient) { 
    // if (environment.production){
    //   this.apiUrl = "backend/";
    // }
    // else {
    //   this.apiUrl = "http://localhost:8000/backend/";
    // }
    this.apiUrl = environment.apiUrl;
  }

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl.concat('categories.php',""));
  }

  getSubcategories(parentId:number): Observable<any> {
    let params = new HttpParams();
    params = params.append('parent_id', parentId);
    return this.http.get(this.apiUrl.concat('subcategory_by_category.php'), {params});
  }

  getFiles(parentId:number): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', parentId);
    return this.http.get(this.apiUrl.concat('files_by_category.php'), {params});
  }

  getAllFiles(): Observable<any> {
    return this.http.get(this.apiUrl.concat('files_all.php'));
  }
}


@Injectable({
  providedIn: 'root',
})
export class CategoryDataResolver implements Resolve<Subcategory> {
  constructor(private dataService: DataService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<Subcategory> {
    return this.dataService.getSubcategories(Number(route.paramMap.get('parent_id')));
  }
}

@Injectable({
  providedIn: 'root',
})
export class FilesDataResolver implements Resolve<File> {
  constructor(private dataService: DataService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<File> {
    return this.dataService.getFiles(Number(route.paramMap.get('parent_id')));
  }
}

@Injectable({
  providedIn: 'root',
})
export class SearchDataResolver implements Resolve<File> {
  constructor(private dataService: DataService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<File> {
    return this.dataService.getAllFiles();
  }
}