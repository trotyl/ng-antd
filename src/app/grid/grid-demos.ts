import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'grid-demos',
  templateUrl: './grid-demos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class GridDemos { }
