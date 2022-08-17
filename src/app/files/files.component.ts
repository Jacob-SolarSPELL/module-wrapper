import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { File } from '../models/file';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  public files: Array<File> = [];
  public parentName: string = "";
  public  math = Math;
  public pathURL= "content"
  constructor( private dataService: DataService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data
    .subscribe((data) => {
      this.files = data['filesData'].files;
      this.parentName = data['filesData'].parentName;
    });
  }

}
