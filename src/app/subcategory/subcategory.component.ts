import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Subcategory } from '../models/subcategory';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  public subcategories: Array<Subcategory> = [];
  public parentName: string = "";
  public  math = Math;
  public image_name = "/.thumbnail.jpeg";
  constructor( private dataService: DataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
    .subscribe((data) => {
      this.subcategories = data['categoryData'].subcategories;
      this.parentName = data['categoryData'].parentName;
    });
  }

}
