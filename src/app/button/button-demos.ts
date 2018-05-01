import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'button-demos',
  templateUrl: './button-demos.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class ButtonDemos { }
