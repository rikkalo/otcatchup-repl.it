import StringCommandService from './StringCommandService'

const enum OPERATION {
  SKIP = 'skip',
  DELETE = 'delete',
  INSERT = 'insert',
}

type SkipOperation = {
  op: OPERATION.SKIP,
  count: number
}

type DeleteOperation = {
  op: OPERATION.DELETE,
  count: number
}

type InsertOperation = {
  op: OPERATION.INSERT,
  chars: string
}

type Operation =
  | SkipOperation
  | DeleteOperation
  | InsertOperation


function isValidAfterOperation(
  commandService: StringCommandService, 
  operation: Operation
): boolean {
  switch(operation.op) {
      case OPERATION.SKIP:
        if (commandService.isValidPosition(operation.count)) {
          commandService.skip(operation.count)
        } else {
          return false
        }
        break

      case OPERATION.DELETE:
        if (commandService.isValidPosition(operation.count)) {
          commandService.delete(operation.count)
        } else {
          return false
        }
        break

      case OPERATION.INSERT:
        commandService.insert(operation.chars)
        break
    }
    return true
}

function operationFromObject(obj: any): Operation {
 
  if (typeof obj !== 'object') {
    throw new Error('Operation should be an object.')
  }

  const { op } = obj

  if (op === undefined) {
     throw new Error('Operation should be "skip", "delete" or "insert".')
  }

  switch(op) {
      case OPERATION.SKIP:
      case OPERATION.DELETE:
        const { count } = obj

        if (typeof count !== 'number') {
          throw new Error('Operations "SKIP" and "DELETE" should have a count of type number.')
        }

        return obj

      case OPERATION.INSERT:
        const { chars } = obj

        if (typeof chars !== 'string') {
          throw new Error('Operation "INSERT" should have chars of type string.')
        }

        return obj
      
      default:

        throw new Error('This operation is not supported.')
    }
}

function parseOperations(otjson: string): Operation[] {
  const operations = JSON.parse(otjson)

  if (!Array.isArray(operations)) {
    throw new Error('Given string should be an json array of operations')
  }

  return operations.map(operationFromObject)
}

export function isValid(stale:string, latest:string, otjson: string): boolean {
  const operations = parseOperations(otjson)

  const commandService = new StringCommandService(stale)

  for (const operation of operations) {
    if (!isValidAfterOperation(commandService, operation)) {
      return false
    }
  }

  return commandService.state === latest
}