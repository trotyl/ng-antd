import { Directive } from '@angular/core'
import { Fragment } from './fragment'

@Directive({
  selector: '[antContent]',
})
export class Content extends Fragment {
  type = 'antContent'
}
