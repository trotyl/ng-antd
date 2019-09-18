import { Directive } from '@angular/core'
import { Fragment } from './fragment'

@Directive({
  selector: '[antHeader]',
})
export class Header extends Fragment {
  type = 'antHeader'
}
