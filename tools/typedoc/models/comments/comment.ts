import { CommentTag } from './tag'

/**
 * A model that represents a javadoc comment.
 *
 * Instances of this model are created by the [[CommentHandler]]. You can retrieve comments
 * through the [[BaseReflection.comment]] property.
 */
export interface Comment {
  /**
   * The abstract of the comment. TypeDoc interprets the first paragraph of a comment
   * as the abstract.
   */
  shortText?: string

  /**
   * The full body text of the comment. Excludes the [[shortText]].
   */
  text?: string

  /**
   * The text of the ```@returns``` tag if present.
   */
  returns?: string

  /**
   * All associated javadoc tags.
   */
  tags?: CommentTag[]
}
