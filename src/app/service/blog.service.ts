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

  createBlog(data: any) {
    return this.http.post(this.apiUrl, data)
  }
}
