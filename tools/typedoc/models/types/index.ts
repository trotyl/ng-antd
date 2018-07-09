import { ArrayType } from './array'
import { IntersectionType } from './intersection'
import { IntrinsicType } from './intrinsic'
import { ReferenceType } from './reference'
import { ReflectionType } from './reflection'
import { StringLiteralType } from './string-literal'
import { TupleType } from './tuple'
import { TypeOperatorType } from './type-operator'
import { TypeParameterType } from './type-parameter'
import { UnionType } from './union'
import { UnknownType } from './unknown'

export type Type =
  | ArrayType
  | IntrinsicType
  | IntersectionType
  | ReferenceType
  | ReflectionType
  | StringLiteralType
  | TupleType
  | TypeOperatorType
  | TypeParameterType
  | UnionType
  | UnknownType

export { ArrayType } from './array'
export { IntrinsicType } from './intrinsic'
export { IntersectionType } from './intersection'
export { ReferenceType } from './reference'
export { ReflectionType } from './reflection'
export { StringLiteralType } from './string-literal'
export { TupleType } from './tuple'
export { TypeOperatorType } from './type-operator'
export { TypeParameterType } from './type-parameter'
export { UnionType } from './union'
export { UnknownType } from './unknown'
