import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'layout-demo-custom-trigger',
  templateUrl: './layout-demo-custom-trigger.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutDemoCustomTrigger { }
