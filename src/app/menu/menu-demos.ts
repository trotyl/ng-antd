import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'menu-demos',
  templateUrl: './menu-demos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class MenuDemos { }
