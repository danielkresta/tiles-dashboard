import { Component, ViewChild, inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { TileConfiguration } from '../../services/api.types';

export interface ConfigurationDialogArguments {
  title: string;
  subtitle: string;
  tileConfiguration: TileConfiguration[];
}

@Component({
  selector: 'app-configuration-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatIconModule],
  templateUrl: './configuration-dialog.component.html',
  styleUrls: ['./configuration-dialog.component.scss'],
})
export class ConfigurationDialog {
  private _dialogRef = inject(DialogRef<ConfigurationDialogArguments>);
  protected _data: ConfigurationDialogArguments = inject(DIALOG_DATA);
  protected _tileConfiguration = [...this._data.tileConfiguration];

  @ViewChild(MatTable) table?: MatTable<TileConfiguration[]>;

  _displayedColumns = ['background', 'text', 'link', 'remove'];

  update(): void {
    this._dialogRef.close({
      ...this._data,
      tileConfiguration: this._tileConfiguration,
    })
  }

  addNewRow(): void {
    this._tileConfiguration.push(
      {
        text: "",
        backgroundColor: "#407CFF"
      }
    )
    this.table?.renderRows();
  }

  removeRow(index: number): void {
    this._tileConfiguration.splice(index, 1);
    this.table?.renderRows();
  }
}