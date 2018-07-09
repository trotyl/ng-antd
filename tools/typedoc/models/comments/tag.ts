/**
 * A model that represents a single javadoc comment tag.
 *
 * Tags are stored in the [[Comment.tags]] property.
 */
export interface CommentTag {
  /**
   * The name of this tag.
   */
  tag: string

  /**
   * The name of the related parameter when this is a ```@param``` tag.
   */
  param?: string

  /**
   * The actual body text of this tag.
   */
  text: string
}
