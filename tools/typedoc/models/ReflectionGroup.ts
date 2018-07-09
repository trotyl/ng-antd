import { Reflection, ReflectionKind } from './reflections/abstract'

/**
 * A group of reflections. All reflections in a group are of the same kind.
 *
 * Reflection groups are created by the ´GroupHandler´ in the resolving phase
 * of the dispatcher. The main purpose of groups is to be able to more easily
 * render human readable children lists in templates.
 */
export class ReflectionGroup {
    /**
     * The title, a string representation of the typescript kind, of this group.
     */
    title: string

    /**
     * The original typescript kind of the children of this group.
     */
    kind: ReflectionKind

    /**
     * All reflections of this group.
     */
    children: number[]
}
