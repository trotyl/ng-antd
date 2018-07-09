import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'grid-demo-responsive',
  templateUrl: './grid-demo-responsive.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class GridDemoResponsive { }
