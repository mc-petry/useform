export interface SynteticEvent {
  preventDefault(): void
}

export interface FieldData<TValue = any, TName = string> {
  name: TName
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
  [P in keyof T]: FieldData<any, keyof T>
}

type FieldsDefs<T> = {
  [P in keyof T]: FieldClass<T[P], T>;
}

export type ValidationResult = any
export type ValidateFn<V, T, R = ValidationResult> = (value: V, form: FormClass<T>) => R
export type ChangedFn<V, T> = (newValue: V, form: FormClass<T>) => void
export type SubmitFn<T> = (values: T) => void
export type FieldsList<T> = ReadonlyArray<keyof T> | (keyof T)

export interface FieldClass<TValue, TFields> {
  validate<TResult = ValidationResult>(fn: ValidateFn<TValue, TFields, TResult>): FieldClass<TValue, TFields>
  changed(fn: ChangedFn<TValue, TFields>): FieldClass<TValue, TFields>
  warn(fn: ValidateFn<TValue, TFields>): FieldClass<TValue, TFields>
  dependent(fields: FieldsList<TFields>): FieldClass<TValue, TFields>
  validateOnChange(validate: boolean): FieldClass<TValue, TFields>
  validateOnBlur(validate: boolean): FieldClass<TValue, TFields>
}

const validateEmpty = () => undefined

class Field<TValue, TFields> implements FieldClass<TValue, TFields> {
  _validateFn?: ValidateFn<TValue, TFields> = validateEmpty
  _changedFn?: ChangedFn<TValue, TFields>
  _warnFn?: ValidateFn<TValue, TFields>
  _dependent?: FieldsList<TFields>
  _validateOnChange: boolean = false
  _validateOnBlur: boolean = true

  validate(fn: ValidateFn<TValue, TFields>) {
    this._validateFn = fn
    return this
  }

  changed(fn: ChangedFn<TValue, TFields>) {
    this._changedFn = fn
    return this
  }

  warn(fn: ValidateFn<TValue, TFields>) {
    this._warnFn = fn
    return this
  }

  dependent(fields: FieldsList<TFields>) {
    this._dependent = fields
    return this
  }

  validateOnChange(validate: boolean) {
    this._validateOnChange = validate
    return this
  }

  validateOnBlur(validate: boolean) {
    this._validateOnBlur = validate
    return this
  }
}

const newField = <TValue, TField>() =>
  new Field<TValue, TField>()

interface UpdateableComponent {
  forceUpdate(): void
}

export interface FormTransformers<T> {
  error?: (input: any, field: FieldData<any, keyof T>) => any
  label?: (field: FieldData<any, keyof T>) => any
}

export interface FormOptions<T> {
  submit?: SubmitFn<T>
  transformers?: FormTransformers<T>
}

export interface FormBuilderClassConfigure<T> extends FormBuilderClass<T> {
  configure(options: FormOptions<T>): FormBuilderClass<T>
}

export interface FormBuilderClass<T> {
  build(component: { forceUpdate(): void }): FormClass<T>
}

class FormBuilder<T> implements
  FormBuilderClass<T>,
  FormBuilderClassConfigure<T>
{
  private _options: FormOptions<T> = {}

  constructor(private _fieldsDefs: FieldsDefs<T>) {
  }

  configure(options: FormOptions<T>) {
    this._options = options
    return this
  }

  build(component: UpdateableComponent) {
    return new Form<T>(this._fieldsDefs, this._options, component)
  }
}

export interface FormModel {
  [key: string]: any
}

export const formBuilder = <T extends FormModel>(fn: (field: <TValue = any>() => FieldClass<TValue, T>) => FieldsDefs<T>): FormBuilderClassConfigure<T> =>
  new FormBuilder<T>(fn(newField))

export type ErrorsMapList<T> = {
  field: keyof T
  error?: ValidationResult
  warn?: ValidationResult
}[]

export interface FormClass<T extends FormModel> {
  readonly fields: Fields<{[P in keyof T]: FieldClass<T[P], T> }>
  setValues(values: Partial<T> | undefined, strict?: boolean): void
  getValues(): T
  validate(fields?: FieldsList<T>): Promise<boolean>
  setErrors(errors: ErrorsMapList<T>): void
  hasError(): boolean
  hasWarn(): boolean
  handleSubmit(e: SynteticEvent): void
}

class Form<T extends FormModel> implements FormClass<T> {
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

      const transformers = this._options.transformers

      this.fields[name].label = transformers && transformers.label
        ? transformers.label(this.fields[name])
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

  async validate(fields: FieldsList<T> = this._fieldsNames) {
    if (typeof fields === 'string') {
      this.validateField(fields)
    }
    else {
      for (const name of fields)
        this.validateField(name)
    }

    this.updateComponent()

    return !this.hasError()
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
    const transformers = this._options.transformers

    return error
      ? transformers && transformers.error
        ? transformers.error(error, field)
        : error
      : null
  }

  private validateField(fieldName: string) {
    const fieldDef = this._fieldsDefs[fieldName] as Field<any, T>
    const validateFn = fieldDef._validateFn
    const warnFn = fieldDef._warnFn
    const field = this.fields[fieldName]

    if (validateFn)
      field.error = this.transformError(field, validateFn(field.value, this))

    if (warnFn)
      field.warn = this.transformError(field, warnFn(field.value, this))

    // Validate dependent fields
    const dependent = fieldDef._dependent

    if (dependent) {
      if (typeof dependent === 'string') {
        if (this.fields[dependent].touched)
          this.validateField(dependent)
      }
      else {
        for (const dependentField of dependent)
          if (this.fields[dependentField].touched)
            this.validateField(dependentField)
      }
    }
  }

  private onFocus(fieldName: string) {
    const field = this.fields[fieldName]
    field.touched = true
  }

  private onBlur(fieldName: string) {
    if (this.fields[fieldName].dirty) {
      const def = this._fieldsDefs[fieldName] as Field<any, T>
      if (def._validateOnBlur)
        this.validateField(fieldName)

      this.updateComponent()
    }
  }

  private onChange(fieldName: string, value: any) {
    const field = this.fields[fieldName]
    field.value = value
    field.dirty = true

    const fieldDef = this._fieldsDefs[fieldName] as Field<any, T>

    if (fieldDef._validateOnChange)
      this.validateField(fieldName)

    if (fieldDef._changedFn)
      fieldDef._changedFn(value, this)

    this.updateComponent()
  }

  private updateComponent() {
    this._component.forceUpdate()
  }
}