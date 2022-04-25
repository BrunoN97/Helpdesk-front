import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Tecnico } from 'src/app/Models/tecnico';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.scss'],
})
export class TecnicoListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      nome: 'qualquer um',
      cpf: '123',
      email: 'sasda',
      senha: '123',
      perfis: ['0'],
      dataCriacao: '01/01/2022',
    },
  ];
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'acoes',
  ];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
