import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PessoasService } from './pessoas.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {ModalModule} from "ngx-bootstrap/modal";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot() //para ser usado na aplicacao inteira
  ],
  providers: [HttpClientModule, PessoasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
