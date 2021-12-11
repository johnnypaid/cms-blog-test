import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss']
})
export class ManageBlogComponent implements OnInit {

  resBlogData: any;
  blogData = [];

  blogEntry = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    metaTitle: ['', Validators.required],
    metaDescription: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private blogService:BlogService) { }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog() {
    this.blogService.getBlog()
      .subscribe(resdata => {
        this.resBlogData = resdata;
        this.blogData = this.resBlogData;
        console.log(this.blogData);
      });
  }

  updateBlog() {
    console.log('Update button!');
  }

  deleteBlog() {
    console.log('Delete blog!');
  }

  onSubmit() {
    // console.log(this.blogEntry.value);
    this.blogService.createBlog(this.blogEntry.value)
      .subscribe(resdata => {
        console.log(resdata);
      })

  }
}
