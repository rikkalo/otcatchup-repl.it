import { AssertionError } from 'assert'

export function it(text: string, testcase: () => void) {
  try {
    testcase();
    console.log(`${text}: ok`)
  } catch (e) {
    console.error(`${text}: failed`)
    if (!(e instanceof AssertionError)) {
      console.error(e)
    }
  }
}