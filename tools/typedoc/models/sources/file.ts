/**
 * Represents references of reflections to their defining source files.
 *
 * @see [[DeclarationReflection.sources]]
 */
export interface SourceReference {
  /**
   * The filename of the source file.
   */
  fileName: string

  /**
   * The number of the line that emitted the declaration.
   */
  line: number

  character: number
}
