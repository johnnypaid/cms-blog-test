import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { BlogService } from '../service/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogData: any;
  getTwoBlog = [];

  constructor(
    private title: Title, 
    private meta: Meta,
    private blogService: BlogService) { }

  ngOnInit(): void {
    this.title.setTitle('Cms blog homepage');
    this.meta.addTag({name: 'description', content: 'Home page meta description.'});

    this.blogService.getBlog()
      .subscribe(resdata => {
        this.blogData = resdata;

        for(let i = 0; i < 2; i++) {
          this.getTwoBlog.push(this.blogData.data[i]);
        }
        console.log(this.getTwoBlog);
      })
  }
}
