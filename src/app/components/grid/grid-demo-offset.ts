import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'grid-demo-offset',
  templateUrl: './grid-demo-offset.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class GridDemoOffset { }
