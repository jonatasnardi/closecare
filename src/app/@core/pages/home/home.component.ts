import { Component, OnInit } from '@angular/core';
import { IPokeDetails } from 'src/app/shared/interfaces/poke-details.interface';
import { PokeService } from 'src/app/shared/services/poke/poke.service';
import { uppercaseFirstLetter } from 'src/app/shared/utils/functions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public displayedColumns = ['image', 'name', 'abilities', 'type', 'actions'];
  public dataSource: any[] = [];
  public pokemons: IPokeDetails[] = [];
  
  constructor(
    private pokeService: PokeService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.pokeService.getAll()
      .subscribe((response: IPokeDetails[]) => {
        this.pokemons = response;
        this.dataSource = this.pokemons.map((item: IPokeDetails) => {
          return {
            image: item.sprites.front_shiny,
            name: uppercaseFirstLetter(item.name),
            abilities: item.abilities.map((item: any) => uppercaseFirstLetter(item.ability.name)).join('; '),
            type: uppercaseFirstLetter(item.types[0]?.type.name),
            action: '',
          }
        });

        console.log('this.dataSource', this.dataSource)
      });
  }

}
