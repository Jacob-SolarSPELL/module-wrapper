import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Subcategory } from './models/subcategory';

////Dev new//////////////////////////////////////////////////////////////////////////////////////
const cats = [
  {
    id: 11,
    name: "Test 11",
    description: "This is a root level folder",
    path: "/Test 11",
    has_img: true,
    has_files: false,
    parent_id: null,
  },
  {
    id: 12,
    name: "Test 12",
    description: "This is also a root level folder",
    path: "/Test 12",
    has_img: true,
    has_files: false,
    parent_id: null,
  },
  {
    id: 121,
    name: "subcat test 121",
    description: "this is a test",
    path: "/Test 11/subcat test 121",
    has_img: true,
    has_files: true,
    parent_id: 12,
  }
];

const fls = [
  {
    id: 1,
    name: "test file",
    size: "5MB",
    file_path: "/Test 12/subcat test 121/test file.txt",
    category_id: 121,
  }
];
////Dev end//////////////////////////////////////////////////////////////////////////////////////

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: string;

  constructor(private http: HttpClient) { 
    this.apiUrl = "backend/";
   
  }

  getCategories(): Observable<any> {
////Dev old//////////////////////////////////////////////////////////////////////////////////////
    // return this.http.get(this.apiUrl.concat('categories.php',""));
////Dev new//////////////////////////////////////////////////////////////////////////////////////
    return new Observable((observer) => {
      var topLevelCats = cats.filter((cat) => cat.parent_id == null);
      var mapped = topLevelCats.map((cat) => {return {
        id: cat.id,
        name: cat.name,
        description: cat.description,
        path: cat.path,
        has_img: cat.has_img,
        has_files: cat.has_files
      }});
      observer.next(mapped);
    });
////Dev end//////////////////////////////////////////////////////////////////////////////////////
  }

  getSubcategories(parentId:number): Observable<any> {
    let params = new HttpParams();
    params = params.append('parent_id', parentId);
////Dev old//////////////////////////////////////////////////////////////////////////////////////
    // return this.http.get(this.apiUrl.concat('subcategory_by_category.php'), {params});
////Dev new//////////////////////////////////////////////////////////////////////////////////////
    return new Observable((observer) => {
      var subCats = cats.filter((cat) => cat.parent_id == parentId);
      var mapped = subCats.map((cat) => {return {
        id: cat.id,
        name: cat.name,
        has_files: cat.has_files
      }});
      observer.next(
        {
          parentName: cats.find((cat) => cat.parent_id == parentId)?.name,
          subcategories: mapped,
        }
      );
    });
////Dev end//////////////////////////////////////////////////////////////////////////////////////
  }

  getFiles(parentId:number): Observable<any> {
    let params = new HttpParams();
    params = params.append('id', parentId);
////Dev old//////////////////////////////////////////////////////////////////////////////////////
    // return this.http.get(this.apiUrl.concat('files_by_category.php'), {params});
////Dev new//////////////////////////////////////////////////////////////////////////////////////
    var files = fls.filter((file) => file.category_id == parentId);
    var mapped = files.map((file) => {return {
      id: file.id,
      name: file.name,
      size: file.size,
      file_path: file.file_path,
      category_id: file.category_id.toString(),
      category_name: cats.find((cat) => cat.id == file.category_id)?.name
    }});
    return new Observable((observable) => {
      observable.next({
        parentName: cats.find((cat) => cat.parent_id == parentId)?.name,
        files: mapped,
      });
    });
////Dev end//////////////////////////////////////////////////////////////////////////////////////
  }

  getAllFiles(): Observable<any> {
////Dev old//////////////////////////////////////////////////////////////////////////////////////
    // return this.http.get(this.apiUrl.concat('files_all.php'));
////Dev new//////////////////////////////////////////////////////////////////////////////////////
    return new Observable((observable) => {
      observable.next();
    });
////Dev end//////////////////////////////////////////////////////////////////////////////////////
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