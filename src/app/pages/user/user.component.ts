import { Component, OnInit, Injectable  } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../../../model/User';
import { UserService } from '../../../services/user.service';

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

@Injectable()
export class UserComponent implements OnInit {

  isloading: boolean;
  exibeModal: boolean;
  userList: User[];

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private body: string;

  constructor(private srv: UserService) {}

  ngOnInit() {
    this.isloading = false;
    this.exibeModal = true;

    this.srv.getAllUser().subscribe(
      (res: User[]) => {
        this.userList = res;
        this.isloading = false;
        // this.exibeModal = false;
      },
      (err) => {
        alert('Erro ao recuperar')
      }
    );
  }

  create(email, nome, sobrenome, tecnologias, usuario) {
    this.body = JSON.parse('{' +
      '"email":"' + email + '",' +
      '"nome":"' + nome + '",' +
      '"sobrenome":"' + sobrenome + '",' +
      '"tecnologias":"' + tecnologias + '",' +
      '"usuario":"' + usuario + '"' +
      '}'
    )

    this.srv.newUser(this.body).subscribe(
      data  => { console.log('POST Request is successful ', data); },
      error  => { console.log('Error ', error); }
    );

    window.location.reload();
  };

  delete(id) {
    this.srv.deleteUser(id).subscribe(
      data  => { console.log('Delete Request is successful ', data); },
      error  => { console.log('Error', error); }
    );
  };
}
