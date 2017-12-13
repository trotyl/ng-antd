import { Component, Input } from '@angular/core'

@Component({
  selector: 'ant-radio-group',
  templateUrl: './radio-group.html'
})
export class RadioGroup {
  @Input() value: string
}
