import { Component, OnInit } from '@angular/core';
import { Vaga } from '../../../model/Vaga';
import { HttpHeaders } from '@angular/common/http';
import {VagaService} from '../../../services/vaga.service';

declare interface VagaData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'vaga-cmp',
    moduleId: module.id,
    templateUrl: 'vaga.component.html'
})

export class VagaComponent implements OnInit {
  isloading: boolean;
  exibeModal: boolean;

  vagaList: Vaga[];

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  private body: string;

  constructor(private srv: VagaService) {}

  ngOnInit() {
    this.isloading = false;
    this.exibeModal = true;

    this.srv.getAllVaga().subscribe(
      (res: Vaga[]) => {
        this.vagaList = res;
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
      '"empresa":"' + email + '",' +
      '"vaga":"' + nome + '",' +
      '"salario":"' + sobrenome + '",' +
      '"tecnologias":"' + tecnologias + '",' +
      '"link":"' + usuario + '"' +
      '}'
    )

    this.srv.newVaga(this.body).subscribe(
      data  => { console.log('POST Request is successful ', data); },
      error  => { console.log('Error ', error); }
    );

    window.location.reload();
  };

  delete(id) {
    this.srv.deleteVaga(id).subscribe(
      data  => { console.log('Delete Request is successful ', data); },
      error  => { console.log('Error', error); }
    );
  };
}
