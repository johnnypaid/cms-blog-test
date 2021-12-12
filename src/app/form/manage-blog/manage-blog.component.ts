import { Component, OnInit, ViewChild } from '@angular/core';
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
  message = '';
  idToDelete = '';

  @ViewChild('closebutton') closebutton;
  @ViewChild('success') success;
  @ViewChild('delete') delete;

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
        this.blogData = this.resBlogData.data;
        console.log(this.blogData);
      });
  }

  updateBlog(data: any) {
    this.blogService.getBlogById(data)
      .subscribe(resdata => {
        console.log(resdata);
      }, err => {
        console.log(err);
      });
  }

  confirmDelete(data: any) {
    this.idToDelete = data;
    this.delete.nativeElement.click();
  }

  deleteBlog() {
    this.message = '';

    if(this.idToDelete) {
      this.blogService.deleteBlog(this.idToDelete)
      .subscribe(resdata => {
        this.message = 'Blog has been delete.';
        this.successModal();
        this.ngOnInit();
      }, err => {
        console.log(err.message);
      });
    }
  }

  onSubmit() {
    // console.log(this.blogEntry.value);
    this.message = '';
    
    this.blogService.createBlog(this.blogEntry.value)
      .subscribe(resdata => {
        this.resBlogData = resdata;

        if(this.resBlogData.success) {
          this.message = 'Blog has been created and published.';
          this.ngOnInit();
          this.successModal();
        }
        // this.closebutton.nativeElement.click();
      });
  }

  successModal() {
    this.success.nativeElement.click();
  }
}
