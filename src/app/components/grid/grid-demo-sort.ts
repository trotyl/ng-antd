import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'grid-demo-sort',
  templateUrl: './grid-demo-sort.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoSort { }
