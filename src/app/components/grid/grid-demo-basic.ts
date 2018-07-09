import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'grid-demo-basic',
  templateUrl: './grid-demo-basic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoBasic { }
