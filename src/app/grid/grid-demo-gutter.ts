import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'grid-demo-gutter',
  templateUrl: './grid-demo-gutter.html',
  styleUrls: ['./grid-demo-gutter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class GridDemoGutter { }
