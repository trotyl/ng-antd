import { Directive } from '@angular/core'
import { Fragment } from './fragment'

@Directive({
  selector: '[antFooter]',
})
export class Footer extends Fragment {
  type = 'antFooter'
}
