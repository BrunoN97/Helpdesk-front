import { ToastrService } from 'ngx-toastr';
import { ClienteService } from './../../../services/cliente.service';
import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/Models/cliente';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.scss'],
})
export class ClienteUpdateComponent implements OnInit {
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

  update(): void {
    console.log(this.cliente.perfis);
    this.service.update(this.cliente).subscribe(
      () => {
        this.toast.success('Cliente atualizado com sucesso!', 'Atualidação');
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
