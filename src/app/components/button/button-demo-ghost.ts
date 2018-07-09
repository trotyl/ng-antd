import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * `ghost` property will make button's background transparent, it is common used in colored background.
 *
 * @order 8
 * @title Ghost Button
 */
@Component({
  selector: 'button-demo-ghost',
  templateUrl: './button-demo-ghost.html',
  styleUrls: [`./button-demo-ghost.css`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoGhost { }
