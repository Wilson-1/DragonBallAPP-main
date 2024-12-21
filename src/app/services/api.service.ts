import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharacter } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private _http = inject(HttpClient);
  private _url: string = 'https://dragonball-api.com/api/characters?race=Saiyan&affiliation=Z fighter';
  private _url2: string = 'https://dragonball-api.com/api/characters';

  getAllCharacters():Observable<ICharacter[]>{
    return this._http.get<ICharacter[]>(this._url);
  }

  getFindCharacter(id: number):Observable<any>{
    return this._http.get<ICharacter>(`${this._url2}/${id}`);
  }

}