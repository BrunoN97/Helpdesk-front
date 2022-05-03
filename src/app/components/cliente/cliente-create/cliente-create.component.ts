import { ToastrService } from 'ngx-toastr';
import { ClienteService } from './../../../services/cliente.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Models/cliente';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.scss'],
})
export class ClienteCreateComponent implements OnInit {
  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

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
    private router: Router
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.cliente).subscribe(
      () => {
        this.toast.success('Cliente cadastrado com sucesso!', 'Cadastro');
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

  addPerfil(perfil: any): void {
    if (this.cliente.perfis.includes(perfil)) {
      //verifica se ja existe o perfil selecionado
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1); // exclui o perfil selecionado pelo index
      console.log(this.cliente.perfis);
    } else {
      this.cliente.perfis.push(perfil); // Add o perfil no array Perfis
      console.log(this.cliente.perfis);
    }
  }

  validaCampos() {
    return (
      this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
    );
  }
}
