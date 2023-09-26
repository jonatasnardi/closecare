import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPoke } from '../../interfaces/poke.interface';
import { IPokeDetails } from '../../interfaces/poke-details.interface';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  public getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon?limit=7`).pipe(
      switchMap((data: any) => {
        return forkJoin(data.results.map((item: IPoke) => this.getPokemon(item.name).pipe(
          switchMap((poke: IPokeDetails) => {
            return of(poke);
          })
        )))
      })
    );
  }

  public getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon/${name}`);
  }

  public addPokemon(body: any): Observable<any> {
    return of({
      success: true,
      message: 'Adicionado com sucesso.',
    }).pipe(delay(2000));
  }

  public editPokemon(body: any): Observable<any> {
    return of({
      success: true,
      message: 'Editado com sucesso.',
    }).pipe(delay(2000));
  }
}
