import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private latestBlogData: any;

  apiUrl = 'http://localhost:4200/api/v1/blog';

  constructor(private http: HttpClient) { }

  getBlog() {
    return this.http.get(this.apiUrl);
  }

  getBlogById(data: any) {
    return this.http.get(this.apiUrl + '/' + data);
  }

  getBlogByTitle(title: String) {
    return this.http.get(this.apiUrl + '/blog/' + title);
  }

  updateBlog(data: {id: String, payload: {}}) {
    return this.http.put(this.apiUrl + '/' + data.id, data.payload);
  }

  createBlog(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  deleteBlog(data:any) {
    return this.http.delete(this.apiUrl + '/' + data);
  }

  setBlogData(data: any) {
    this.latestBlogData = data;
  }

  getBlogData() {
    return this.latestBlogData;
  }
}
