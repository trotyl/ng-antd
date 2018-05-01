import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'icon-demos',
  templateUrl: './icon-demos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class IconDemos { }
