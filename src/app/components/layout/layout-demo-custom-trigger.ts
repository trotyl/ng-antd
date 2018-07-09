import { ChangeDetectionStrategy, Component } from '@angular/core'

/**
 * If you want to use a customized trigger, you can hide the default one by setting `trigger={null}`.
 *
 * @order 4
 * @title Custom trigger
 */
@Component({
  selector: 'layout-demo-custom-trigger',
  templateUrl: './layout-demo-custom-trigger.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoCustomTrigger { }
