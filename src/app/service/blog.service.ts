import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from '../shared/blog';

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
    console.log(data);
  }
}
