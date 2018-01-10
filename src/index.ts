export interface SynteticEvent {
  preventDefault(): void
}

export interface FieldData<TValue = any> {
  name: string
  dirty: boolean
  touched: boolean
  value?: TValue
  error: any
  warn: any
  label?: any

  onFocus: (e: SynteticEvent) => void
  onBlur: (e: SynteticEvent) => void
  onChange: (e: SynteticEvent, value: TValue) => void
}

export type Fields<T> = {
  [P in keyof T]: FieldData<any>
}

type FieldsDefs<T> = {
  [P in keyof T]: FieldClass<T[P], T>;
}

export type ValidationResult = any
export type TransformErrorFn = (input: any, field: FieldData) => any
export type LabelFormatterFn = (field: FieldData) => any
export type ValidateFn<V, T> = (value: V, form: FormClass<T>) => ValidationResult
export type OnChangeFn<V> = (newValue: V) => void
export type SubmitFn<T> = (values: T) => void

export interface FieldClass<TValue, TField> {
  validate(fn: ValidateFn<TValue, TField>): FieldClass<TValue, TField>
  warn(fn: ValidateFn<TValue, TField>): FieldClass<TValue, TField>
  onChange(fn: OnChangeFn<TValue>): FieldClass<TValue, TField>
}

class Field<TValue, TField> implements FieldClass<TValue, TField> {
  validateFn?: ValidateFn<TValue, TField>
  warnFn?: ValidateFn<TValue, TField>
  onChangeFn?: OnChangeFn<TValue>

  validate(fn: ValidateFn<TValue, TField>) {
    this.validateFn = fn
    return this
  }

  warn(fn: ValidateFn<TValue, TField>) {
    this.warnFn = fn
    return this
  }

  onChange(fn: OnChangeFn<TValue>) {
    this.onChangeFn = fn
    return this
  }
}

const newField = <TValue, TField>() =>
  new Field<TValue, TField>()

interface UpdateableComponent {
  forceUpdate(): void
}

export interface FormOptions<T> {
  submit?: SubmitFn<T>
  transformError?: (input: any, field: FieldData) => any
  labelFormatter?: (field: FieldData) => any
}

export interface FormBuilderClassFields<T> {
  fields(fn: (field: <TValue = any>() => FieldClass<TValue, T>) => {[P in keyof T]: FieldClass<T[P], T> }): FormBuilderClass<T>
}

export interface FormBuilderClass<T> {
  configure(options: FormOptions<T>): FormBuilderClass<T>
  build(component: { forceUpdate(): void }): FormClass<T>
}

class FormBuilder<T> implements
  FormBuilderClass<T>,
  FormBuilderClassFields<T>
{
  private _options: FormOptions<T> = {}
  private _fieldsDefs: FieldsDefs<T>

  fields(fn: (field: <TValue = any>() => FieldClass<TValue, T>) => FieldsDefs<T>) {
    this._fieldsDefs = fn(newField)
    return this
  }

  configure(options: FormOptions<T>) {
    this._options = options
    return this
  }

  build(component: UpdateableComponent) {
    return new Form<T>(this._fieldsDefs, this._options, component)
  }
}

export const formBuilder = <T extends { [key: string]: any }>(): FormBuilderClassFields<T> =>
  new FormBuilder<T>()

export type ErrorsMapList<T> = {
  field: keyof T
  error: ValidationResult
  warn: ValidationResult
}[]

export interface FormClass<T extends { [key: string]: any }> {
  readonly fields: Fields<{[P in keyof T]: FieldClass<T[P], T> }>
  setValues(values: Partial<T> | undefined, strict?: boolean): void
  getValues(): T
  validate(): Promise<boolean>
  setErrors(errors: ErrorsMapList<T>): void
  hasError(): boolean
  handleSubmit(e: SynteticEvent): void
}

class Form<T extends { [key: string]: any }> implements FormClass<T> {
  readonly fields: Fields<{[P in keyof T]: Field<T[P], T> }>
  private readonly _fieldsNames: ReadonlyArray<string>

  constructor(private readonly _fieldsDefs: FieldsDefs<T>, private readonly _options: FormOptions<T>, private readonly _component: UpdateableComponent) {
    this.fields = {} as any
    const names: string[] = []

    for (const name of Object.keys(this._fieldsDefs)) {
      this.fields[name] = {
        name,
        dirty: false,
        touched: false,
        error: null,
        warn: null,
        onFocus: () => this.onFocus(name),
        onBlur: () => this.onBlur(name),
        onChange: (_, value) => this.onChange(name, value)
      }

      this.fields[name].label = this._options.labelFormatter
        ? this._options.labelFormatter(this.fields[name])
        : name

      names.push(name)
    }

    this._fieldsNames = names
  }

  setValues(values: Partial<T> | undefined, strict = true) {
    if (!values)
      return

    for (const name of Object.keys(values)) {
      if (!this.fields[name])
        if (strict)
          throw new Error(`No specified field for name: "${name}"`)
        else
          continue

      this.fields[name].value = values[name]
    }
  }

  getValues(): T {
    const values: Partial<T> = {}
    this._fieldsNames.forEach(name => values[name] = this.fields[name].value)

    return values as T
  }

  async validate() {
    this._fieldsNames.forEach(name => this.validateField(name))

    const hasErrors = this.hasError()

    if (hasErrors)
      this.updateComponent()

    return !hasErrors
  }

  setErrors(errors: ErrorsMapList<T>) {
    for (const error of errors) {
      const field = this.fields[error.field]

      field.error = this.transformError(field, error.error)
      field.warn = this.transformError(field, error.warn)
    }

    this.updateComponent()
  }

  handleSubmit = (e: SynteticEvent) => {
    e.preventDefault()

    this.validate()
      .then(success => {
        if (success && this._options.submit)
          this._options.submit(this.getValues())
      })
  }

  hasError() {
    let hasError = false

    for (const name of this._fieldsNames) {
      if (this.fields[name].error) {
        hasError = true
        break
      }
    }

    return hasError
  }

  hasWarn() {
    let hasWarn = false

    for (const name of this._fieldsNames) {
      if (this.fields[name].warn) {
        hasWarn = true
        break
      }
    }

    return hasWarn
  }

  private transformError(field: FieldData, error: any) {
    return error
      ? this._options.transformError
        ? this._options.transformError(error, field)
        : error
      : null
  }

  private validateField(fieldName: string) {
    const fieldDef: Field<any, T> = this._fieldsDefs[fieldName]
    const validateFn = fieldDef.validateFn
    const warnFn = fieldDef.validateFn
    const field = this.fields[fieldName]

    if (validateFn)
      field.error = this.transformError(field, validateFn(field.value, this))

    if (warnFn)
      field.error = this.transformError(field, warnFn(field.value, this))
  }

  private onFocus(fieldName: string) {
    const field = this.fields[fieldName]
    field.touched = true
  }

  private onBlur(fieldName: string) {
    if (this.fields[fieldName].dirty) {
      this.validateField(fieldName)
      this.updateComponent()
    }
  }

  private onChange(fieldName: string, value: any) {
    const fieldOptions: Field<any, T> = this._fieldsDefs[fieldName]
    if (fieldOptions.onChangeFn)
      fieldOptions.onChangeFn(value)

    const field = this.fields[fieldName]
    field.value = value
    field.dirty = true

    this.updateComponent()
  }

  private updateComponent() {
    this._component.forceUpdate()
  }
}