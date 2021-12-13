import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  blogTitle: '';
  blogContent: '';
  paramObject = [];
  blogObject: any;
  blogData: any;


  constructor(
    private route: ActivatedRoute, 
    private blogView: BlogService,
    private meta: Meta,
    private title: Title) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.paramObject.push(params);
        this.blogTitle = this.paramObject[0].params.title;
        console.log(this.blogTitle);
      });

      this.getBlog();
  }

  getBlog() {
    this.blogView.getBlogByTitle(this.blogTitle)
      .subscribe(resdata => {
        this.blogObject = resdata;
        this.blogData = this.blogObject.data[0];
        this.blogTitle = this.blogData.title;
        this.blogContent = this.blogData.content;
        this.title.setTitle(this.blogTitle);
        this.meta.updateTag({name: 'description', content: this.blogData.description});

        console.log(this.blogData);
      });
  }

}
