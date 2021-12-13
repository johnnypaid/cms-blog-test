import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service.service';
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
  createType: {submitType: 'CREATE'};
  showCreateBtn = true;
  showUpdateBtn = false;
  submitCase = true;
  updateId = '';
  getBlogData: any;
  errMessage = '';
  showErr = false;
  addUpdateModal = '';

  @ViewChild('closebutton') closebutton: ElementRef;
  @ViewChild('success') success: ElementRef;
  @ViewChild('delete') delete: ElementRef;
  @ViewChild('create') create: ElementRef;

  blogEntry = this.formBuilder.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    metaTitle: [''],
    metaDescription: ['']
  });

  constructor(
    private formBuilder: FormBuilder, 
    private blogService:BlogService, 
    private fakeAuth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBlog();
    this.showErr = false;
  }

  getBlog() {
    this.blogService.getBlog()
      .subscribe(resdata => {
        this.resBlogData = resdata;
        this.blogService.setBlogData(this.resBlogData.data);
        this.blogData = this.blogService.getBlogData();
        console.log(this.blogData);
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

  addUpdate(data: {submitType: String, id?: String}) {
    console.log(data);
    if (data) {
      switch(data.submitType) {
        case 'CREATE': {
          this.addUpdateModal = "Create Blog"
          this.blogEntry.reset();
          this.submitCase = true;
          this.create.nativeElement.click();
          break;
        }
        case 'UPDATE': {
          const getBlogArray = this.blogService.getBlogData();

          this.addUpdateModal = "Update Blog"
          this.getBlogData = getBlogArray.filter(blog => blog.id === data.id);
          console.log(this.getBlogData[0].id);
          this.submitCase = false;
          this.setSubmitModalValue(this.getBlogData);
          this.create.nativeElement.click();
          break;
        }
      }
    }
  }
  
  onSubmit() {
    if(this.blogEntry.valid) {
      this.message = '';
      if(this.submitCase === true) {
        this.blogService.createBlog(this.blogEntry.value)
        .subscribe(resdata => {
          this.resBlogData = resdata;
  
          if(this.resBlogData.success) {
            this.message = 'Blog has been created and published.';
            this.ngOnInit();
            this.successModal();
          }
  
          this.closebutton.nativeElement.click();
  
        }, err => {
          console.log(err.message);
        });
      } else {
        this.blogService.updateBlog({id: this.getBlogData[0].id, payload: this.blogEntry.value})
          .subscribe(resdata => {
            this.resBlogData = resdata;
  
            if(this.resBlogData.success) {
              this.message = 'Blog has been updated and published.';
              this.ngOnInit();
              this.successModal();
            }
    
            this.closebutton.nativeElement.click();
  
          }, err => {
            console.log(err);
          });
      }
    } else {
      this.errMessage = 'Title and content are required.';
      this.showErr = true;
    } 
  }

  setSubmitModalValue(data: {}) {
    this.blogEntry.controls.title.setValue(data[0].title);
    this.blogEntry.controls.content.setValue(data[0].content);
    this.blogEntry.controls.metaTitle.setValue(data[0].metaTitle);
    this.blogEntry.controls.metaDescription.setValue(data[0].metaDescription);
  }

  successModal() {
    this.success.nativeElement.click();
  }

  logout() {
    this.fakeAuth.logout();
    this.router.navigate(['login']);
  }
}
