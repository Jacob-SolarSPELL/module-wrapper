import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit {

  @Input() filePath="";
  public fileURL: any;


  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.fileURL = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(this.filePath));
  }

}
