import { ServiceModule } from './../service/service.module';
import { Component, OnInit } from '@angular/core';
import { Conversa } from './model/Conversa';
import { isNull } from 'util';
import { Curso } from './model/Curso';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  mensagens: Conversa[] = [];
  valor: string = '';
  usuario = true;
  url: string = ' ';
  curso = {} as Curso;

  sliceOptions = {
    start: 0,
    end: 300,
    default: 300,
  };

  constructor(private service: ServiceModule) {
    this.mensagens.push({
      mensagem: String(
        'Ola,sou sua assistente virtual.Digite o nome da tecnologia ou curso que gostaria de procurar.'
      ),
      usuario: false,
      error: true,
      url: '',
    });
  }

  ngOnInit() {}
  displayChat = true;
  suggestion_Button = true;
  // bot = false;

  chat() {
    this.displayChat = !this.displayChat;
  }

  onSubmit() {
    return this.valor != null ? this.valor : null;
  }

  onExpandText(evt: any): void {
    this.sliceOptions.end = this.sliceOptions.end
      ? undefined!
      : this.sliceOptions.default;
  }

  //pega os cursos
  getCursos(cursotitulo: string) {
    this.suggestion_Button = false;
    this.mensagens.push({ mensagem: cursotitulo, usuario: true });
    this.mensagemResposta(this.service.getCursosbyName('Python'));
    this.mensagemResposta(
      'Se ainda gostaria da minha ajuda,digite um curso ou tecnologia.Precisa de mim ainda?'
    );

    //procurar o curso e retorna
  }

  //pega a mensagem do usuario e faz aparecer na tela
  async enviarDado() {
    this.suggestion_Button = false;
    this.mensagens.push({ mensagem: this.valor, usuario: true });

    if (this.valor.trim() == '' || this.valor == null) {
      this.preencherMensagemVazia();
    } else {
      if (this.valor.toLocaleLowerCase() == 'não') {
        this.mensagens.push({ mensagem: 'Adeus', usuario: false });
      } else {
        this.mensagemResposta(this.service.getCursosbyName(this.valor));
        this.mensagemResposta(
          'Se ainda gostaria da minha ajuda,digite um curso ou tecnologia.Precisa de mim ainda?'
        );
      }
    }
    this.valor = ''; //Limpa a barra onde digita
  }

  async mensagemResposta(respostaCurso: any) {
    this.mensagens.push({
      mensagem: String(respostaCurso),
      usuario: false,
      error: false,
    });
  }

  async mensagemDespedida() {
    this.mensagens.push({
      mensagem: String('Adeus!'),
      usuario: false,
      error: false,
    });
  }

  preencherMensagemVazia() {
    this.mensagens.push({
      mensagem: String('Favor Digitar uma Mensagem...'),
      usuario: false,
    });
  }
}
