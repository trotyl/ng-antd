import { Comment } from '../comments/comment'
import { SourceReference } from '../sources/file'
import { ReferenceType, Type } from '../types/index'

/**
 * Defines the available reflection kinds.
 */
export enum ReflectionKind {
  Global = 0,
  ExternalModule = 1,
  Module = 2,
  Enum = 4,
  EnumMember = 16,
  Variable = 32,
  Function = 64,
  Class = 128,
  Interface = 256,
  Constructor = 512,
  Property = 1024,
  Method = 2048,
  CallSignature = 4096,
  IndexSignature = 8192,
  ConstructorSignature = 16384,
  Parameter = 32768,
  TypeLiteral = 65536,
  TypeParameter = 131072,
  Accessor = 262144,
  GetSignature = 524288,
  SetSignature = 1048576,
  ObjectLiteral = 2097152,
  TypeAlias = 4194304,
  Event = 8388608,
}

export interface ReflectionFlags {
  /**
   * Is this a private member?
   */
  isPrivate?: boolean

  /**
   * Is this a protected member?
   */
  isProtected?: boolean

  /**
   * Is this a public member?
   */
  isPublic?: boolean

  /**
   * Is this a static member?
   */
  isStatic?: boolean

  /**
   * Is this member exported?
   */
  isExported?: boolean

  /**
   * Is this a declaration from an external document?
   */
  isExternal?: boolean

  /**
   * Whether this reflection is an optional component or not.
   *
   * Applies to function parameters and object members.
   */
  isOptional?: boolean

  /**
   * Whether it's a rest parameter, like `foo(...params);`.
   */
  isRest?: boolean

  /**
   *
   */
  hasExportAssignment?: boolean

  isConstructorProperty?: boolean

  isAbstract?: boolean

  isConst?: boolean

  isLet?: boolean
}

/**
 * Defines the usage of a decorator.
 */
export interface Decorator {
  /**
   * The name of the decorator being applied.
   */
  name: string

  /**
   * The type declaring the decorator.
   * Usually a ReferenceType instance pointing to the decorator function.
   */
  type: Type

  /**
   * A named map of arguments the decorator is applied with.
   */
  arguments: { [parameter: string]: string }
}

export interface ReflectionBase {
  /**
   * Unique id of this reflection.
   */
  id: number

  /**
   * The symbol name of this reflection.
   */
  name: string

  /**
   * The kind of this reflection.
   */
  kind: ReflectionKind

  flags: ReflectionFlags

  /**
   * TODO: add type if needed
   */
  groups: never
}

/**
 * Base class for all reflection classes.
 *
 * While generating a documentation, TypeDoc generates an instance of [[ProjectReflection]]
 * as the root for all reflections within the project. All other reflections are represented
 * by the [[DeclarationReflection]] class.
 *
 * This base class exposes the basic properties one may use to traverse the reflection tree.
 * You can use the [[children]] and [[parent]] properties to walk the tree. The [[groups]] property
 * contains a list of all children grouped and sorted for being rendered.
 */
export interface Reflection extends ReflectionBase {
  /**
   * The human readable string representation of the kind of this reflection.
   */
  kindString: string

  /**
   * The parsed documentation comment attached to this reflection.
   */
  comment?: Comment

  /**
   * A list of all source files that contributed to this reflection.
   */
  sources: SourceReference[]
}

export interface InheritableReflection extends Reflection {
  implementationOf?: ReferenceType
  inheritedFrom?: ReferenceType
  overwrites?: ReferenceType
}
