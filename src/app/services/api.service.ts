import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { TileConfiguration, UpdateResponse } from './api.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _httpClient = inject(HttpClient);

  private _baseUrl = 'https://tiles-api.com/';

  getTiles(): Observable<TileConfiguration[]> {
    return this._httpClient.get<TileConfiguration[]>(this._baseUrl + 'tiles');
  }

  updateTiles(configuration: TileConfiguration[]): Observable<UpdateResponse> {
    return this._httpClient.post<UpdateResponse>(
      this._baseUrl + 'tiles',
      configuration
    );
  }
}
