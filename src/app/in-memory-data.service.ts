import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const pokemons = [
       { id: 12, name: 'Eevee' },
  { id: 13, name: 'Snorlax' },
  { id: 14, name: 'Charmander' },
  { id: 15, name: 'Charizard' },
  { id: 16, name: 'Squirtle' },
  { id: 17, name: 'kyogre' },
  { id: 18, name: 'Groudon' },
  { id: 19, name: 'Arceus' },
  { id: 20, name: 'Mewtwo' }
    ];
    return {pokemons};
  }

  genId(pokemons: Pokemon[]): number {
    return pokemons.length > 0 ? Math.max(...pokemons.map(pokemon => pokemon.id)) + 1 : 11;
  }
}
