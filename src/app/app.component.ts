import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { Observable, ReplaySubject, combineLatest, merge } from 'rxjs';
import { filter, first, map, startWith, switchMap } from 'rxjs/operators';

import { UiTileComponent } from './components/ui-tile/ui-tile.component';
import { ApiService } from './services/api.service';
import { ApiMockService } from './services/api-mock.service';
import {
  ConfigurationDialog,
  ConfigurationDialogArguments,
} from './components/configuration-dialog/configuration-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UiTileComponent, MatIconModule, DialogModule],
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
  private _iconRegistry = inject(MatIconRegistry);
  private _sanitizer = inject(DomSanitizer);
  private _dialog = inject(Dialog);

  protected readonly _dialogUpdate$ = new ReplaySubject<ConfigurationDialogArguments>(
    1,
  );

  protected readonly _title$ = this._dialogUpdate$.pipe(
    map((dialogResult) => dialogResult.title),
    startWith('Get Inspired'),
  );

  protected readonly _subtitle$ = this._dialogUpdate$.pipe(
    map((dialogResult) => dialogResult.subtitle),
    startWith('Extra Text'),
  );

  protected readonly _tiles$ = merge(
    this._apiService.getTiles(),
    this._dialogUpdate$.pipe(
      map((dialogResult) => dialogResult.tileConfiguration),
    ),
  );

  constructor() {
    this._loadIcons();
    this._openDialog();
  }

  openConfiguration(): void {
    this._openDialog();
  }

  private _loadIcons() {
    // This could definitely become a icons loading service once there are more
    this._iconRegistry.addSvgIcon(
      'settings',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/icon-bb-iconset-settings.svg',
      ),
    );
    this._iconRegistry.addSvgIcon(
      'remove',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/icon-bb-iconset-remove.svg',
      ),
    );
    this._iconRegistry.addSvgIcon(
      'plus',
      this._sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/icon-admin-iconset-plus.svg',
      ),
    );
  }

  private _openDialog(): void {
    /**
     * This is what I'm not very content with. I'd love to write a proper stream that can deal with everything,
     * the dialog, the GET, the POST; and have everything as observable.
     */
    const dialogResult$ = combineLatest([
      this._tiles$,
      this._title$,
      this._subtitle$,
    ]).pipe(
      first(),
      switchMap(
        ([tileConfiguration, title, subtitle]) =>
          this._dialog.open<ConfigurationDialogArguments>(ConfigurationDialog, {
            disableClose: true,
            data: {
              title,
              subtitle,
              tileConfiguration,
            },
          }).closed,
      ),
      filter(
        (dialogResult): dialogResult is ConfigurationDialogArguments =>
          dialogResult !== undefined,
      ),
    );

    this.handleDialogResult(dialogResult$);
  }

  private handleDialogResult(
    dialogResult$: Observable<ConfigurationDialogArguments>,
  ): void {
    dialogResult$
      .pipe(
        switchMap((dialogResult) =>
          this._apiService.updateTiles(dialogResult.tileConfiguration).pipe(
            map((updateResult) => {
              if (updateResult.status === 'success') {
                return dialogResult;
              }
              return null;
            }),
          ),
        ),
        filter(
          (dialogResult): dialogResult is ConfigurationDialogArguments =>
            dialogResult !== undefined,
        ),
      )
      .subscribe((dialogResult) => this._dialogUpdate$.next(dialogResult));
  }
}
