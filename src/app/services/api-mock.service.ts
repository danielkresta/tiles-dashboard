import { Observable, of } from 'rxjs';

import { fakeTiles } from './fake-api';
import { TileConfiguration, UpdateResponse } from './api.types';

export class ApiMockService {
  getTiles(): Observable<TileConfiguration[]> {
    return of(fakeTiles);
  }

  updateTiles(configuration: TileConfiguration[]): Observable<UpdateResponse> {
    console.log(
      'POST: updateTiles with configuration: ',
      JSON.stringify(configuration)
    );
    return of({ status: 'success' });
  }
}
