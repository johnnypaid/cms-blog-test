import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  apiUrl = 'http://localhost:4200/api/v1/blog';

  constructor(private http: HttpClient) { }

  getBlog() {
    return this.http.get(this.apiUrl);
  }

  getBlogById(data: any) {
    return this.http.get(this.apiUrl + '/' + data);
  }

  updateBlog(data: any) {
    // return this.http.put(this.apiUrl + '/' + data);
  }

  createBlog(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  deleteBlog(data:any) {
    return this.http.delete(this.apiUrl + '/' + data);
  }
}
