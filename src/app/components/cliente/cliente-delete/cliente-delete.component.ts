import { ToastrService } from 'ngx-toastr';
import { ClienteService } from './../../../services/cliente.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Models/cliente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.scss'],
})
export class ClienteDeleteComponent implements OnInit {
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  };

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe((resposta) => {
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }

  delete(): void {
    console.log(this.cliente.perfis);
    this.service.delete(this.cliente.id).subscribe(
      () => {
        this.toast.success('Cliente deletado com sucesso!', 'Delete');
        this.router.navigate(['clientes']);
      },
      (ex) => {
        console.log(ex);
        if (ex.error.errors) {
          ex.error.errors.forEach((element) => {
            this.toast.error(element.message);
          });
        } else {
          this.toast.error(ex.error.message);
        }
      }
    );
  }
}
