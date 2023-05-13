import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { ServiceRoutingModule } from './service-routing.module';
import {Curso} from '../chat/model/Curso';
import { catchError, Observable, retry ,throwError} from 'rxjs';
import json from '../curso/cursos';


@Injectable({
  providedIn: 'root',
})


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServiceRoutingModule,

  ]
})

export class ServiceModule {
  constructor(private HttpClient: HttpClient) {}

  getCursosbyName(curso_titulo:string){
    let curso = json.cursos_List.find(c=>c.curso_titulo.toLowerCase()===curso_titulo.toLowerCase())
    if(curso === undefined ){
      return "Não encontramos o curso desejado!"
    }else{
      let resultcurso = "Titulo: " + curso?.curso_titulo + " Link: <a href=\"" + curso?.curso_link + "\" target=\"_blank\">Clique aqui</a>"
    return resultcurso
    }

  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


 }
