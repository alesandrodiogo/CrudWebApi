import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from './Pessoa';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  url = 'http://localhost:5128/api/pessoas';

  constructor(private http: HttpClient) { }

  PegarTodos(): Observable<Pessoa[]>{ //conjunto de dados q emite notificacoes ao Angular 
    return this.http.get<Pessoa[]>(this.url);
  }
  PegarPeloId(pessoaId: number): Observable<Pessoa>{
    const apiUrl =`${this.url}/${pessoaId}}`;
    return this.http.get<Pessoa>(apiUrl);
  }
  SalvarPessoa(pessoa: Pessoa): Observable<any>{
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions);
  }
  ActualizarPessoa(pessoa: Pessoa) : Observable<any>{
    return this.http.put<Pessoa>(this.url, pessoa, httpOptions);
  }
  ExcluirPessoa(pessoaId: number) : Observable<any>{
    const apiUrl = `${this.url}/${pessoaId}}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
