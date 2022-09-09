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
    { casseteNome: 'Cassete 1', data:'2020-01-01', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Cassete 2', data:'2020-01-02', tipo: 'Tipo APX', status: 'Desativado' },
    { casseteNome: 'Cassete 3', data:'2020-01-03', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Cassete 4', data:'2021-02-01', tipo: 'Tipo XPTO', status: 'Desativado' },
    { casseteNome: 'Cassete 5', data:'2021-02-02', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg2 Cassete 1', data:'2021-02-03', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg2 Cassete 2', data:'2022-03-02', tipo: 'Tipo APX', status: 'Desativado' },
    { casseteNome: 'Pg2 Cassete 3', data:'2022-03-02', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg2 Cassete 4', data:'2022-03-03', tipo: 'Tipo XPTO', status: 'Desativado' },
    { casseteNome: 'Pg2 Cassete 5', data:'2022-12-01', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg3 Cassete 1', data:'2022-12-02', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg3 Cassete 2', data:'2022-12-03', tipo: 'Tipo APX', status: 'Desativado' },
  ]

  //VARIAVEIS PARA PAGINACAO
  public conteudoAlerta = '';
  public alerta = false;
  public showPrevButton = false;
  public showNextButton = true;
  public verTodos = true;
  public verPaginacao = true;  
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
    this.showPrevButton = false;      
    this.showNextButton = false;  
    this.searchText.toLowerCase;
    this.VirarMinusculo();


    if (this.searchText === '') {
      this.conteudoAlerta = 'Campo vazio, por favor busque novamente, ou acesse: '
      this.alerta = true
      this.tabelaCassetes = this.cassFiltrados;
      setTimeout(() => {
        this.alerta =false        
      }, 7000);
    } 
    else{
      this.cassFiltrados = this.dadosAPI.filter(cassete => 
        cassete.casseteNome.includes(this.searchText) ||
        cassete.data.includes(this.searchText) ||
        cassete.tipo.includes(this.searchText) ||
        cassete.status.includes(this.searchText) 
        );
        this.tabelaCassetes = this.cassFiltrados;
        this.posFinalSliceTela = this.tabelaCassetes.length;
        console.log(this.cassFiltrados);
        
      if(typeof this.tabelaCassetes !== "undefined" && this.tabelaCassetes.length == 0){
      this.conteudoAlerta = 'Valor não encontrado, por favor busque novamente, ou acesse: '
      this.alerta = true
      setTimeout(() => {
        this.alerta =false        
      }, 7000);
    }

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
    this.verPaginacao = true;
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


  //FORMATAR DATA
  public FormatarData(data:string){

    const dia = data.split("/")[0];
    const mes = data.split("/")[1];
    const ano = data.split("/")[2];

    return ano + '-' + ("0"+mes).slice(-2) + '-' +("0"+dia).slice(-2);

  }

  //PESQUISAR
  public inputData1 = '2021/06/05';
  public inputData2 = '2021/06/10';
  public cassDentroIntervalo: Array<{casseteNome: string, data: string, tipo: string, status: string}> = [];

  public Pesquisar(){
   this.inputData1 = (document.getElementById('picker1') as HTMLInputElement).value;
   this.inputData2 = (document.getElementById('picker2') as HTMLInputElement).value;

   if (this.inputData1 === '' || this.inputData2 === '') {
    this.conteudoAlerta = 'Datas não preenchidas, por favor preencha as datas ou acesse: '
    this.alerta = true
    this.tabelaCassetes = this.cassDentroIntervalo;
    setTimeout(() => {
      this.alerta =false        
    }, 7000);
  } else if (this.inputData1 >= this.inputData2) {
    this.conteudoAlerta = 'Data inicial maior que a final, preencha as datas corretamente ou acesse: '
    this.alerta = true
    this.tabelaCassetes = this.cassDentroIntervalo;
    setTimeout(() => {
      this.alerta =false        
    }, 7000);
  } else {

      this.cassDentroIntervalo = this.dadosAPI.filter(cassete => 
      cassete.data >= this.inputData1 && cassete.data <= this.inputData2 
      )
      console.log(this.cassDentroIntervalo); 

      this.tabelaCassetes = this.cassDentroIntervalo;

      this.verPaginacao = false
  }
    // this.cassDentroIntervalo.forEach(cassete => {
    //   cassete.data = this.FormatarData(cassete.data);
    // })    
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
