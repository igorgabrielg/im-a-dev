import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VagaService {

  url = 'http://localhost:8080/vaga';

  constructor(private http: HttpClient) { }

  getAllVaga() { return this.http.get(this.url) }

  newVaga(body) { return this.http.post(this.url, body) }

  deleteVaga(id) { return this.http.delete(this.url + '/' + id) }
}
