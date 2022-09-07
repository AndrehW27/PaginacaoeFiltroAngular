import { Injectable } from '@angular/core';
import {Cassete} from '../cassetes.model'
import {CASSETES} from '../cassetes-mock'

@Injectable({
  providedIn: 'root'
})
export class ConsultaCasseteService {

  getCassetes(): Cassete[] {
    return CASSETES
  }
}
