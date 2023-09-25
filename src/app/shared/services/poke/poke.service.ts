import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  private baseUrl: string = environment.baseUrl;
  
  constructor(
    private http: HttpClient,
  ) { }

  public getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  public getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}pokemon/${name}`);
  }
}
