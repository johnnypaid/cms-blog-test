import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-blog',
  templateUrl: './manage-blog.component.html',
  styleUrls: ['./manage-blog.component.scss']
})
export class ManageBlogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  updateBlog() {
    console.log('Update button!');
  }

  deleteBlog() {
    console.log('Delete blog!');
  }
}
