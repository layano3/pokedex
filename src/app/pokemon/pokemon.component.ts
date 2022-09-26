import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { POKEMONS } from '../mock-pokemon';
import { PokemonService } from '../pokemon.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
		pokemon = POKEMONS;

		pokemons: Pokemon[] = [];

  constructor(private pokemonService: PokemonService, private messageService: MessageService) { }

  ngOnInit(): void {
  	this.getPokemons();
  }

  getPokemons(): void {
  this.pokemonService.getPokemons().subscribe(pokemons => this.pokemons = pokemons);
}

add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.pokemonService.addPokemon({ name } as Pokemon)
    .subscribe(pokemon => {
      this.pokemons.push(pokemon);
    });
}

}
