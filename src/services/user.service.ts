import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  getAllUser() { return this.http.get(this.url) }

  newUser(body) { return this.http.post(this.url, body) }

  deleteUser(id) { return this.http.delete(this.url + '/' + id) }
}
