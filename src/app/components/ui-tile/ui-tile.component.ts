import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-tile.component.html',
  styleUrls: ['./ui-tile.component.scss'],
})
export class UiTileComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) backgroundColor!: string;
  @Input({ required: true }) link!: string | undefined;
}
