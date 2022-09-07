import { Component, OnInit } from '@angular/core';
import {Cassete} from '../../cassetes.model'
import {ConsultaCasseteService} from '../../services/consulta-cassete.service'

@Component({
  selector: 'app-consulta-cassete',
  templateUrl: './consulta-cassete.component.html',
  styleUrls: ['./consulta-cassete.component.scss']
})
export class ConsultaCasseteComponent implements OnInit {

  public cassetes: Cassete[] = [];

public dadosAPI:  Array<{casseteNome: string, data: string, tipo: string, status: string}> =  [
    { casseteNome: 'Cassete 1', data:'01/01/2020', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Cassete 2', data:'02/01/2020', tipo: 'Tipo APX', status: 'Desativado' },
    { casseteNome: 'Cassete 3', data:'03/01/2020', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Cassete 4', data:'01/02/2021', tipo: 'Tipo XPTO', status: 'Desativado' },
    { casseteNome: 'Cassete 5', data:'02/02/2021', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg2 Cassete 1', data:'03/02/2021', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg2 Cassete 2', data:'01/03/2022', tipo: 'Tipo APX', status: 'Desativado' },
    { casseteNome: 'Pg2 Cassete 3', data:'02/03/2022', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg2 Cassete 4', data:'03/03/2022', tipo: 'Tipo XPTO', status: 'Desativado' },
    { casseteNome: 'Pg2 Cassete 5', data:'01/12/2022', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg3 Cassete 1', data:'02/12/2022', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg3 Cassete 2', data:'03/12/2022', tipo: 'Tipo APX', status: 'Desativado' },
  ]

  //VARIAVEIS PARA PAGINACAO
  public alerta = false;
  public showPrevButton = false;
  public showNextButton = true;
  public verTodos = true;
  // public verPaginacaoFiltrar = true;
  public paginaAtual = 1;
  public apiLength = this.dadosAPI.length;
  public itensPorPagina = 5;
  public numeroPaginas = Math.floor(this.apiLength / this.itensPorPagina) + 1;
  public posInicialSlice = 0;
  public posFinalSlice = 5;
  public posFinalSliceTela = 5;
  public tabelaCassetes = this.dadosAPI.slice(this.posInicialSlice, this.posFinalSlice)

  //FECHAR ALERTA
  public CloseAlert(){
    this.alerta = false;
  }

  //TRANSFORMAR DADOS API EM MINUSCULO
  public VirarMinusculo(){
   this.dadosAPI.map(cassete => (
       cassete.casseteNome = cassete.casseteNome.toLowerCase(),
       cassete.data = cassete.data.toLowerCase(),
       cassete.tipo = cassete.tipo.toLowerCase(),
       cassete.status = cassete.status.toLowerCase()       
      )
    )
  }

  //FILTRAR 
  public searchText = '';
  public cassFiltrados: Array<{casseteNome: string, data: string, tipo: string, status: string}> = []

  public Filtrar() { 
    this.verTodos = false;
    console.log(this.verTodos);
    
    this.showPrevButton = false;      
    this.showNextButton = false;  
    this.searchText.toLowerCase;
    this.VirarMinusculo();
    this.cassFiltrados = this.dadosAPI.filter(cassete => 
      cassete.casseteNome.includes(this.searchText) ||
      cassete.data.includes(this.searchText) ||
      cassete.tipo.includes(this.searchText) ||
      cassete.status.includes(this.searchText) 
      );
    this.tabelaCassetes = this.cassFiltrados;
    this.posFinalSliceTela = this.tabelaCassetes.length;

    if (this.searchText === '') {
      this.alerta =true
      setTimeout(() => {
        this.alerta =false        
      }, 5000);
    }
  }

  //VER TODOS
  public VerTodos(){
    this.verTodos = false;
    this.showPrevButton = false;      
    this.showNextButton = false;  
    this.posInicialSlice = 0;
    this.posFinalSlice = this.apiLength;
    this.posFinalSliceTela = this.posFinalSlice;
    this.tabelaCassetes = this.dadosAPI.slice(this.posInicialSlice, this.posFinalSlice)
  }

  //PagInicial
  public PagInicial(){
    this.verTodos = true;
    this.showNextButton = true;
    this.paginaAtual = 1;
    this.apiLength = this.dadosAPI.length;
    this.itensPorPagina = 5;
    this.numeroPaginas = Math.floor(this.apiLength / this.itensPorPagina) + 1;
    this.posInicialSlice = 0;
    this.posFinalSlice = 5;
    this.posFinalSliceTela = 5;
    this.tabelaCassetes = this.dadosAPI.slice(this.posInicialSlice, this.posFinalSlice)
  }

  //PESQUISAR
  public valorInput1 = '';
  public valorInput2 = '';

  public Pesquisar(){
    this.valorInput1 = (document.getElementById('picker1')as HTMLInputElement).value;
    console.log(this.valorInput1);
    this.valorInput2 = (document.getElementById('picker2')as HTMLInputElement).value;
    console.log(this.valorInput2);  
    //Mostrar ou não botoes prev e next
    if (this.paginaAtual === 1) {
      this.showPrevButton = false;      
      this.showNextButton = true;      
    } else if(this.paginaAtual === this.numeroPaginas){
      this.showNextButton = false;      
      this.showPrevButton = true; 
    }  
  }

  //FUNCAO ANTERIOR
  public anterior() {
    this.verTodos = true;
    if (this.paginaAtual > 1) {
      this.paginaAtual -= 1;
      this.posInicialSlice -= this.itensPorPagina;
      this.posFinalSlice -= this.itensPorPagina;
      if (this.posFinalSlice >=  this.apiLength) {
        this.posFinalSliceTela = this.apiLength;      
      }else{
        this.posFinalSliceTela = this.posFinalSlice;
      }
      this.tabelaCassetes = this.dadosAPI.slice(this.posInicialSlice, this.posFinalSlice)
    } 
    //Mostrar ou não botoes prev e next
    if (this.paginaAtual === 1) {
      this.showPrevButton = false;      
    } else {
      this.showNextButton = true; 
    }  
  }

  //FUNCAO PROXIMA
  public proxima() {
    this.verTodos = true;
    if (this.paginaAtual < this.numeroPaginas) {
      this.paginaAtual += 1;
      this.posInicialSlice += this.itensPorPagina;
      this.posFinalSlice += this.itensPorPagina;
      if (this.posFinalSlice >=  this.apiLength) {
        this.posFinalSliceTela = this.apiLength;      
      }else{
        this.posFinalSliceTela = this.posFinalSlice;
      }
      this.tabelaCassetes = this.dadosAPI.slice(this.posInicialSlice, this.posFinalSlice)
    } 
      //Mostrar ou não botoes prev e next
      if (this.paginaAtual === this.numeroPaginas) {
        this.showNextButton = false;    
        this.showPrevButton = true; 
      } else {
        this.showPrevButton = true; 
      }     
  }

  //DROPDOWN ITENS POR PAG
  public itensPorPg(event: any) {
    this.verTodos = true;
    this.itensPorPagina = parseInt(event.target.value)
    this.numeroPaginas = Math.floor(this.apiLength / this.itensPorPagina) + 1;
    this.paginaAtual = 1;
    this.posInicialSlice = 0;
    this.posFinalSlice = this.itensPorPagina;   
    if (this.posFinalSlice >=  this.apiLength) {
      this.posFinalSliceTela = this.apiLength;      
    }else{
      this.posFinalSliceTela = this.posFinalSlice;
    }
    this.tabelaCassetes = this.dadosAPI.slice(this.posInicialSlice, this.posFinalSlice)
    console.log(event.target.value);
      //Mostrar ou não botoes prev e next
      this.showNextButton = false;  
      if (this.numeroPaginas > 1) {
        this.showNextButton = true;      
      } else {
        this.showNextButton = false; 
      }  
  }

  constructor(private casseteService: ConsultaCasseteService) { }

  getCassetes(): void {
    this.cassetes = this.casseteService.getCassetes();
  }

  ngOnInit() {
    console.log("");
    console.log("DADOS API:");
    console.log(this.dadosAPI);
    console.log("");

    console.log("");
    console.log("DADOS CASSETE SERVICE:");
    console.log(this.cassetes);
    console.log("");
  }
}
