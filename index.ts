import * as assert from 'assert'
import { it } from './utils'
import { isValid } from './operations'

it("Example #1", () => {
  assert.equal(isValid(
    "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
    "Repl.it uses operational transformations.",
    '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}]'
  ), true);
})

it("Example #2", () => {
  assert.equal(isValid(
    "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
    "Repl.it uses operational transformations.",
    '[{"op": "skip", "count": 45}, {"op": "delete", "count": 47}]'
  ), false);
})

it("Example #3", () => {
  assert.equal(isValid(
    "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
    "Repl.it uses operational transformations.",
    '[{"op": "skip", "count": 40}, {"op": "delete", "count": 47}, {"op": "skip", "count": 2}]'
  ), false);
})

it("Example #4", () => {
  assert.equal(isValid(
    "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
    "We use operational transformations to keep everyone in a multiplayer repl in sync.",
    '[{"op": "delete", "count": 7}, {"op": "insert", "chars": "We"}, {"op": "skip", "count": 4}, {"op": "delete", "count": 1}]'
  ), true);
})

it("Example #5", () => {
  assert.equal(isValid(
    "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
    "Repl.it uses operational transformations to keep everyone in a multiplayer repl in sync.",
    "[]"
  ), true);
})
