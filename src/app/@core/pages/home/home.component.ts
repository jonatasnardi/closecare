import { Component, OnInit } from '@angular/core';
import { IPokeDetails } from 'src/app/shared/interfaces/poke-details.interface';
import { IPokeList } from 'src/app/shared/interfaces/poke-list.interface';
import { PokeService } from 'src/app/shared/services/poke/poke.service';
import { StateService } from 'src/app/shared/services/state/state.service';
import { uppercaseFirstLetter } from 'src/app/shared/utils/functions';
import { finalize } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { FormPokeComponent } from './components/form-poke/form-poke.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public displayedColumns: string[] = ['image', 'name', 'abilities', 'type', 'action'];
  public dataSource: IPokeList[] = [];
  public pokemons: IPokeDetails[] = [];

  constructor(
    private pokeService: PokeService,
    private stateService: StateService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.stateService.setIsLoading(true);

    this.pokeService.getAll()
      .pipe(finalize(() => this.stateService.setIsLoading(false)))
      .subscribe((response: IPokeDetails[]) => {
        this.pokemons = response;
        this.dataSource = this.pokemons.map((item: IPokeDetails) => {
          return {
            id: item.id,
            image: item.sprites.front_shiny,
            name: uppercaseFirstLetter(item.name),
            abilities: item.abilities.map((item: any) => uppercaseFirstLetter(item.ability.name)).join('; '),
            type: uppercaseFirstLetter(item.types[0]?.type.name),
            action: '',
          }
        });
      });
  }

  public onAddItem(): void {
    this.openModalAdd();
  }

  public onEditItem(item: IPokeList): void {
    this.openModalEdit(item);
  }

  private openModalAdd(): void {
    this.dialog.open(FormPokeComponent, {
      width: '500px',
    });
  }

  private openModalEdit(item: IPokeList): void {
    this.dialog.open(FormPokeComponent, {
      width: '500px',
      data: this.pokemons.find((pokemon: IPokeDetails) => pokemon.id === item.id),
    });
  }
}