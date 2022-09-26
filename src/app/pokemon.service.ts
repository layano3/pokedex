import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { POKEMONS } from './mock-pokemon';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getPokemons(): Observable<Pokemon[]> {
  const pokemons = of(POKEMONS);
  return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(tap(_ => this.log('fetched pokemons')),
      catchError(this.handleError<Pokemon[]>('getPokemons', []))
    );
}

getPokemon(id: number): Observable<Pokemon> {
  const url = `${this.pokemonsUrl}/${id}`;
  return this.http.get<Pokemon>(url).pipe(
    tap(_ => this.log(`fetched pokemon id=${id}`)),
    catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
  );
}


private log(message: string) {
  this.messageService.add(`PokemonService: ${message}`);
}

private pokemonsUrl = 'api/pokemons'; 
httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


updatePokemon(pokemon: Pokemon): Observable<any> {
  return this.http.put(this.pokemonsUrl, pokemon, this.httpOptions).pipe(
    tap(_ => this.log(`updated pokemon id=${pokemon.id}`)),
    catchError(this.handleError<any>('updatePokemon'))
  );
} 

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    
    console.error(error); // log to console instead
    this.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}

addPokemon(pokemon: Pokemon): Observable<Pokemon> {
  return this.http.post<Pokemon>(this.pokemonsUrl, pokemon, this.httpOptions).pipe(
    tap((newPokemon: Pokemon) => this.log(`added pokemon w/ id=${newPokemon.id}`)),
    catchError(this.handleError<Pokemon>('addPokemon'))
  );
}

/* GET heroes whose name contains search term */
searchPokemons(term: string): Observable<Pokemon[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found pokemons matching "${term}"`) :
       this.log(`no pokemons matching "${term}"`)),
    catchError(this.handleError<Pokemon[]>('searchPokemons', []))
  );
}

}
