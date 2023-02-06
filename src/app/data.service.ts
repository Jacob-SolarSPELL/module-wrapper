import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Subcategory } from './models/subcategory';
import { environment } from 'src/environments/environment';

////Dev new//////////////////////////////////////////////////////////////////////////////////////
const cats = [
  {
    id: 0,
    name: "Learning Materials",
    description: "blah blah blah",
    path: "/Learning Materials",
    has_files: false,
    parent_id: null,
  },
  {
    id: 1,
    name: "Lessons",
    description: "blah blah blah",
    path: "/Lessons",
    has_files: false,
    parent_id: null,
  },
  {
    id: 11,
    name: "01 Introduction",
    description: "",
    path: "/Lessons/01 Introduction",
    has_files: true,
    parent_id: 1,
  },
  {
    id: 12,
    name: "02 Principles",
    description: "",
    path: "/Lessons/02 Principles",
    has_files: true,
    parent_id: 1,
  },
  {
    id: 13,
    name: "03 Soil and Rainfall",
    description: "",
    path: "/Lessons/03 Soil and Rainfall",
    has_files: true,
    parent_id: 1,
  },
  {
    id: 14,
    name: "04 Beginning the Season",
    description: "",
    path: "/Lessons/04 Beginning the Season",
    has_files: true,
    parent_id: 1,
  },
];

const fls = [
  {
    id: 1,
    name: "index.html",
    size: "5MB",
    file_path: "/Lessons/01 Introduction/index.html",
    category_id: 11,
  },
  {
    id: 2,
    name: "index.html",
    size: "5MB",
    file_path: "/Lessons/02 Principles/index.html",
    category_id: 12,
  },
  {
    id: 3,
    name: "index.html",
    size: "5MB",
    file_path: "/Lessons/03 Soil and Rainfall/index.html",
    category_id: 13,
  },
  {
    id: 4,
    name: "index.html",
    size: "5MB",
    file_path: "/Lessons/04 Beginning the Season/index.html",
    category_id: 14,
  },
];
////Dev end//////////////////////////////////////////////////////////////////////////////////////

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl: string;

  constructor(private http: HttpClient) { 
    if (environment.production){
      this.apiUrl = "backend/";
    }
    else {
      this.apiUrl = "http://localhost:8000/backend/";
    }
  }

  getCategories(): Observable<any> {
////Dev old//////////////////////////////////////////////////////////////////////////////////////
    return this.http.get(this.apiUrl.concat('categories.php',""));
////Dev new//////////////////////////////////////////////////////////////////////////////////////
    return new Observable((observer) => {
      var topLevelCats = cats.filter((cat) => cat.parent_id == null);
      var mapped = topLevelCats.map((cat) => {return {
        id: cat.id,
        name: cat.name,
        description: cat.description,
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
    return this.http.get(this.apiUrl.concat('subcategory_by_category.php'), {params});
////Dev new//////////////////////////////////////////////////////////////////////////////////////
    return new Observable((observer) => {
      var subCats = cats.filter((cat) => cat.parent_id == parentId);
      var mapped = subCats.map((cat) => {return {
        id: cat.id,
        name: cat.name,
        has_files: cat.has_files,
        path: 'content' + cat.path,
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
    return this.http.get(this.apiUrl.concat('files_by_category.php'), {params});
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
    return this.http.get(this.apiUrl.concat('files_all.php'));
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