import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consulta-cassete',
  templateUrl: './consulta-cassete.component.html',
  styleUrls: ['./consulta-cassete.component.scss']
})
export class ConsultaCasseteComponent implements OnInit {

  public dadosAPI = [
    { casseteNome: 'Cassete 1', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Cassete 1', tipo: 'Tipo APX', status: 'Desativado' },
    { casseteNome: 'Cassete 3', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Cassete 4', tipo: 'Tipo XPTO', status: 'Desativado' },
    { casseteNome: 'Cassete 5', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg2 Cassete 1', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg2 Cassete 2', tipo: 'Tipo APX', status: 'Desativado' },
    { casseteNome: 'Pg2 Cassete 3', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg2 Cassete 4', tipo: 'Tipo XPTO', status: 'Desativado' },
    { casseteNome: 'Pg2 Cassete 5', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg3 Cassete 1', tipo: 'Tipo TCX', status: 'Operante' },
    { casseteNome: 'Pg3 Cassete 2', tipo: 'Tipo APX', status: 'Desativado' },
  ]

  public somenteCassestesArray: string[] = [];

  public somenteCassetesFunction() {
    for (let i = 0; i < this.dadosAPI.length; i++) {
      this.somenteCassestesArray.push(this.dadosAPI[i].casseteNome);
    }
  }

  public ArrCass = this.dadosAPI.map(object => object.casseteNome);
  // this.cassetesFiltrados = this.ArrCass.filter((item) => item === 'Cassete 1');







  public cassetesFiltrados: Array<string> = [];

  // public Filtrar(cassetedigitado: string) {
  //   this.cassetesFiltrados = this.ArrCass.filter((item) => item === cassetedigitado);
  //   this.tabelaCassetes.casseteNome = this.cassetesFiltrados;
  // }

  public nomes: Array<string> = ['Andre', 'Bruna'];
  public nomesIgualAndre = this.nomes.filter((item) => item === 'Andre')

  //VARIAVEIS PARA PAGINACAO
  public paginaAtual = 1;
  public apiLength = this.dadosAPI.length;
  public itensPorPagina = 5;
  public numeroPaginas = Math.floor(this.apiLength / this.itensPorPagina) + 1;
  public posInicialSlice = 0;
  public posFinalSlice = 5;
  public tabelaCassetes = this.dadosAPI.slice(this.posInicialSlice, this.posFinalSlice)

  //FUNCAO ANTERIOR
  public anterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual -= 1;
      this.posInicialSlice -= this.itensPorPagina;
      this.posFinalSlice -= this.itensPorPagina;
      this.tabelaCassetes = this.dadosAPI.slice(this.posInicialSlice, this.posFinalSlice)
    } else {
      // alert('Página Inicial!');
      (<HTMLButtonElement>document.getElementById("anterior")).disabled = true;
      // (<HTMLButtonElement> document.getElementById("anterior")).style.backgroundColor = 'white';
      (<HTMLButtonElement>document.getElementById("anterior")).style.cursor = 'auto';
    }
    (<HTMLButtonElement>document.getElementById("proxima")).disabled = false;
    // (<HTMLButtonElement> document.getElementById("proxima")).style.backgroundColor = 'white';
    (<HTMLButtonElement>document.getElementById("proxima")).style.cursor = 'pointer';
  }

  //FUNCAO PROXIMA
  public proxima() {
    if (this.paginaAtual < this.numeroPaginas) {
      this.paginaAtual += 1;
      this.posInicialSlice += this.itensPorPagina;
      this.posFinalSlice += this.itensPorPagina;
      this.tabelaCassetes = this.dadosAPI.slice(this.posInicialSlice, this.posFinalSlice)
    } else {
      // alert('Página Final!');
      (<HTMLButtonElement>document.getElementById("proxima")).disabled = true;
      // (<HTMLButtonElement> document.getElementById("proxima")).style.backgroundColor = 'white';
      (<HTMLButtonElement>document.getElementById("proxima")).style.cursor = 'auto';
    }
    (<HTMLButtonElement>document.getElementById("anterior")).disabled = false;
    // (<HTMLButtonElement> document.getElementById("anterior")).style.backgroundColor = 'white';
    (<HTMLButtonElement>document.getElementById("anterior")).style.cursor = 'pointer';
  }

  public checkUltimaPagina() {
    if (this.paginaAtual === this.numeroPaginas) {
      (<HTMLButtonElement>document.getElementById("proxima")).disabled = true;
      // (<HTMLButtonElement> document.getElementById("proxima")).style.backgroundColor = 'white';
      (<HTMLButtonElement>document.getElementById("proxima")).style.cursor = 'auto';
    }
  }


  //DROPDOWN ITENS POR PAG
  public itensPorPg(event: any) {
    this.itensPorPagina = parseInt(event.target.value)
    this.numeroPaginas = Math.floor(this.apiLength / this.itensPorPagina) + 1;
    this.posFinalSlice = this.posInicialSlice + this.itensPorPagina
    this.tabelaCassetes = this.dadosAPI.slice(this.posInicialSlice, this.posFinalSlice)
    console.log(event.target.value);
  }




  // valorInputFiltro = '';

  // public cassetesEncontradosFiltro = this.dadosAPI.filter((cassete) => {
  //   return cassete.casseteNome.includes(this.valorInputFiltro);
  // })

  // public INPUT_BUSCA = (document.getElementById('input-busca') as HTMLInputElement).value;

  // public TABELA_CASSETES = (document.getElementById('tabela-cassetes') as HTMLBodyElement);

  // public filtrar() {

  //   let linhasTabela = this.TABELA_CASSETES.getElementsByTagName('tr');
  //   let posicao: any;
  //   for (posicao in linhasTabela) {
  //     // if (true === isNaN(posicao)){
  //     //   continue;
  //     // }

  //     let conteudoDaLinha = linhasTabela[posicao].innerHTML;

  //     if(true === conteudoDaLinha.includes(this.INPUT_BUSCA)){
  //       linhasTabela[posicao].style.display = '';
  //     }
  //     else{
  //       linhasTabela[posicao].style.display = 'none';
  //     }

  //   }

  //   // console.log(this.cassetesEncontradosFiltro);
  //   console.log("filtrado");
  // }

  public filtrar() {
    console.log('Filtrado!');
  }

  constructor() { }

  ngOnInit() {
    console.log("DADOS API:");
    console.log(this.dadosAPI);
    console.log("");

    console.log("Array somente cassetes:");
    this.somenteCassetesFunction();
    console.log(this.somenteCassestesArray);
    console.log("");

    console.log("Cassetes filtrados:");
    console.log(this.cassetesFiltrados);
    console.log("");

    console.log("ARRAY NOMES");
    console.log(this.nomes);
    console.log("ARRAY = ANDRE");
    console.log(this.nomesIgualAndre);
    console.log("");


    console.log("ArrCass:");
    console.log(this.ArrCass);
    console.log("");



  }

}
