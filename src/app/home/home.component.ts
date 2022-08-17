import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Category } from '../models/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public categories: Array<Category> = [];
  //Used in home.component.html
  public  math = Math;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCategories().subscribe(
      result=>{
        this.categories = result;
      }
    );
  }
}
