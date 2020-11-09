export default class StringCommandService {

  constructor(
    private str: string, 
    private currentPosition: number = 0
  ) {}

  get state(): string {
    return this.str
  }

  private splitStringByIndex(str: string, index: number): [string, string] {
    return [str.substring(0, index),
    str.substring(index)]
  }

  isValidPosition(count: number): boolean {
    const newPosition = this.currentPosition + count

    return newPosition >= 0 && newPosition <= this.str.length
  }

  skip(position: number): number {
    this.currentPosition = this.currentPosition + position

    return this.currentPosition
  }

  delete(count: number): string {
    const [firstPart, secondPart] = this.splitStringByIndex(this.str, this.currentPosition)

    this.str = firstPart + secondPart.substring(count)

    return this.str
  }

  insert(chars: string): string {
    const [firstPart, secondPart] = this.splitStringByIndex(this.str, this.currentPosition)

    this.str = firstPart + chars + secondPart
    this.currentPosition += chars.length

    return this.str
  }
}