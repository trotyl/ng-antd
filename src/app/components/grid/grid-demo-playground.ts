import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'grid-demo-playground',
  templateUrl: './grid-demo-playground.html',
  styleUrls: ['./grid-demo-playground.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDemoPlayground {
  gutters = [8, 16, 24, 32, 40, 48]
  cols = [2, 3, 4, 6, 8, 12]

  gutter = 1
  col = 2

  get colRange(): number[] {
    return new Array(this.cols[this.col])
  }
}
