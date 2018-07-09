import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ExtensionModule } from '../extension/extension.module'
import { Icon } from './icon'
import { ICON_PREFIX } from './token'

const TYPES = [
  Icon,
]

const NG_MODULES = [
  ExtensionModule,
]

/**
 * Semantic vector graphics.
 *
 * ## Icons naming convention
 *
 * We provide semantic name for every icon, and naming rules are as follows:
 *
 * - Scanning line icon has the similar name with its solid one，but it's distinguished by `-o`, for example, `question-circle` (a full circle) and `question-circle-o` (an empty circle);
 * - Naming sequence：`[name]-[shape?]-[outline?]-[direction?]`.
 *
 * > `?` means is optional.
 *
 * See more design detail at [here](/docs/spec/icon).
 *
 * ## How To Use
 *
 * Use tag <Icon /> to create an icon and set its type in the type prop, for example:
 *
 * ```html
 * <i antIcon="link"></i>
 * ```
 *
 * ## Local deployment
 *
 * By default, icons are deployed at [iconfont.cn](http://iconfont.cn), publicly available repository of a huge set of icons. In case you need to use a locally deployed version of the icon font, you can refer to [this example](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)。
 *
 * ## List of icons
 *
 * > Click the icon and copy the code。
 *
 * ### Directional Icons
 *
 * <icon-set class="icons" catigory="direction">TODO: add support for icon demo</icon-set>
 *
 * ### Suggested Icons
 *
 * <icon-set class="icons" catigory="suggestion">TODO: add support for icon demo</icon-set>
 *
 * ### Application Icons
 *
 * <icon-set class="icons" catigory="other">TODO: add support for icon demo</icon-set>
 *
 * ### Brand and Logos
 *
 * <icon-set class="icons" catigory="logo">TODO: add support for icon demo</icon-set>
 */
@NgModule({
  declarations: [ TYPES ],
  imports: [
    CommonModule,
    NG_MODULES,
  ],
  exports: [ TYPES, NG_MODULES ],
  providers: [
    { provide: ICON_PREFIX, useValue: 'anticon' },
  ],
})
export class IconModule { }
