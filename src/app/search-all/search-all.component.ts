import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { File } from '../models/file';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {

  public files: Array<File> = [];
  public  math = Math;
  public pathURL= "content"
  constructor(private dataService: DataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
    .subscribe((data) => {
      this.files = data['filesData'];
      console.log(this.files);
    });
  }

}
