export class RequiredParamError extends Error {
  public readonly status
  public readonly type
  constructor (param: string, type = 'required') {
    super(`${param} can not be null or undefined.`)
    this.status = 400
    this.name = 'RequiredParameterError'
    this.type = type
  }
}

export class InvalidPropertyError extends Error {
  public readonly status
  public readonly type
  constructor (msg: string, type = 'invalid') {
    super(msg)
    this.status = 400
    this.name = 'InvalidPropertyError'
    this.type = type
  }
}

export class InvalidNullError extends Error {
  public readonly status
  public readonly type
  constructor (msg: string, type = 'invalid') {
    super(msg)
    this.status = 400
    this.name = 'InvalidNullError'
    this.type = type
  }
}

export class NotFoundError extends Error {
  public readonly status
  public readonly type
  constructor (msg: string, type = 'invalid') {
    super(msg)
    this.status = 404
    this.name = 'NotFoundError'
    this.type = type
  }
}

export class ExistingResource extends Error {
  public readonly status
  public readonly type
  constructor (msg: string, type = 'invalid') {
    super(msg)
    this.status = 400
    this.name = 'existingResource'
    this.type = type
  }
}

export class UnauthorizedError extends Error {
  public readonly status
  public readonly type
  constructor (msg = 'Unauthorized.', type: string) {
    super(msg)
    this.status = 401
    this.name = 'UnauthorizedError'
    this.type = type
  }
}

export class ForbiddenError extends Error {
  public readonly status
  public readonly type
  constructor (msg = 'Forbidden.', type: string) {
    super(msg)
    this.status = 403
    this.name = 'ForbiddenError'
    this.type = type
  }
}
