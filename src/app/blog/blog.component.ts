import { Component, OnInit } from '@angular/core';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  resData: any;
  blogData: [];

  constructor(private blog: BlogService) { }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog() {
    this.blog.getBlog()
      .subscribe(resdata => {
        this.resData = resdata;
        this.blogData = this.resData;
        console.log(this.blogData);
      })
  }
}
