import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiTileComponent } from './components/ui-tile/ui-tile.component';
import { ApiService } from './services/api.service';
import { ApiMockService } from './services/api-mock.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UiTileComponent],
  providers: [
    {
      provide: ApiService,
      useClass: ApiMockService,
    },
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private _apiService = inject(ApiService);

  tiles$ = this._apiService.getTiles();
}
