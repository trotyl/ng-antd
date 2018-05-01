import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'layout-demos',
  templateUrl: './layout-demos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class LayoutDemos { }
