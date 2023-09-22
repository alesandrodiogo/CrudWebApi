import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Pessoa } from 'src/app/Pessoa';
import { PessoasService } from 'src/app/pessoas.service';


@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {
  formulario: any;
  tituloFormulario: any;
  pessoas: Pessoa[];
  //pessoas: Pessoa[] = [];
  nomePessoa: string;
  pessoaId: number;

  visibilidadeTabela: boolean=true;
  visibilidadeFormulario: boolean=false;
  
  modalRef: BsModalRef;

  constructor(
    private pessoasService: PessoasService, nomePessoa: string, pessoaId: number, modalRef: BsModalRef,
    private modalService: BsModalService
    ){
    this.pessoas = [];
    this.nomePessoa = nomePessoa;
    this.pessoaId = pessoaId;
    this.modalRef = modalRef;
  }
  ngOnInit(): void { //Aqui inicializamos as variaveis
    
    this.pessoasService.PegarTodos().subscribe(resultado => {
      this.pessoas = resultado;
    });
    
    this.tituloFormulario =  "Nova Pessoa";

    
  }

  ExibirFormularioCadastro(): void{

    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null)
    });
  }

  ExibirFormularioActualizacao(pessoaId: number): void{
    
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    
    this.pessoasService.PegarPeloId(pessoaId).subscribe(resultado=>{
    this.tituloFormulario = `Actualizar ${resultado.nome} ${resultado.sobrenome}`;

      this.formulario = new FormGroup({
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao)
      });
    });
  }

  EnviarFormulario(): void{
    const pessoa:Pessoa = this.formulario.value;

    if(pessoa.pessoaId > 0){
      this.pessoasService.ActualizarPessoa(pessoa).subscribe(resultado=>{
        this.visibilidadeFormulario = false;
      this.visibilidadeTabela = true;
      alert('Pessoa actualizada com sucesso');
      this.pessoasService.PegarTodos().subscribe(registros=>{
        this.pessoas = registros;
      });
      });
    } 
    else{ 

      this.pessoasService.SalvarPessoa(pessoa).subscribe(resultado=>{
      this.visibilidadeFormulario = false;
      this.visibilidadeTabela = true;
      alert('Pessoa inserida com sucesso');
      this.pessoasService.PegarTodos().subscribe(registros=>{
        this.pessoas = registros;
      });
    });
  }
  }
  Voltar(): void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(pessoaId: number, nomePessoa: string, conteudoModal: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(conteudoModal);
    this.pessoaId = pessoaId;
    this.nomePessoa = nomePessoa;
  }
  ExcluirPessoa(pessoaId: number): void{
    this.pessoasService.ExcluirPessoa(pessoaId).subscribe(resultado=>{
      this.modalRef.hide();
      alert("Pessoa excluida com sucesso");
      this.pessoasService.PegarTodos().subscribe(registros=>{
        this.pessoas = registros;
      });
    });
  }
}
