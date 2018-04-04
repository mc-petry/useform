export interface FieldData<TValue = any, TName extends string = string> {
  name: TName

  /**
   * Gets a value that indicates whether a field value changed
   */
  dirty: boolean

  /**
   * Gets a value that indicated whether a field had a focus
   */
  touched: boolean

  /**
   * Gets field current value
   */
  value?: TValue

  /**
   * Gets current field error
   */
  error: any

  /**
   * Gets current field warning
   */
  warn: any

  /**
   * Gets current field label
   * Use `transformers` to define field labels
   */
  label?: any

  onFocus: () => void
  onBlur: () => void
  onChange: (value: TValue) => void
}

export interface FieldDef<TValue, TFields, TValidationResult = ValidationResult> {
  /**
   * Validate specific field
   */
  validate?: ValidateFn<TValue, TFields, TValidationResult>

  /**
   * Same as `validate` but does not block form submission
   */
  warn?: ValidateFn<TValue, TFields, TValidationResult>

  /**
   * Calls after value changed
   */
  changed?: ChangedFn<TValue, TFields>

  /**
   * Dependent fields that must be validated after this field
   */
  dependent?: FieldsList<TFields>

  /**
   * Override default form behaviour for specific field
   */
  validateOnChange?: boolean

  /**
   * Override default form behaviour for specific field
   */
  validateOnBlur?: boolean
}

export interface SynteticEvent { preventDefault(): void }
export interface ReactComponent { forceUpdate(): void }
export type ValidationResult = any
export type ValidateFn<V, T, R> = (value: V, form: FormClass<T>) => R
export type ChangedFn<V, T> = (newValue: V, form: FormClass<T>) => void
export type SubmitFn<T> = (values: T) => void
export type FieldsList<T> = ReadonlyArray<keyof T> | (keyof T)
export type FieldsDefs<T, TValidationResult> = { [P in keyof T]: FieldDef<T[P], T, TValidationResult> }

export interface FormTransformers<T, TValidationResult> {
  /**
   * Transform fields errors
   */
  error?: (error: TValidationResult, field: FieldData<any, keyof T>) => any

  /**
   * Define fields labels
   */
  label?: (field: FieldData<any, keyof T>) => any
}

export interface FormOptions<T, TValidationResult> {
  /**
   * Submission handler. Will not be called if there are errors
   */
  submit?: SubmitFn<T>

  /**
   * Form transformers
   */
  transformers?: FormTransformers<T, TValidationResult>

  /**
   * Default form behaviour
   * @default false
   */
  validateOnChange?: boolean

  /**
   * Default form behaviour
   * @default true
   */
  validateOnBlur?: boolean
}

export interface FormModel {
  [key: string]: any
}

export type ErrorsMapList<T> = {
  field: keyof T
  error?: ValidationResult
  warn?: ValidationResult
}[]

export type Fields<T> = {
  [P in keyof T]-?: FieldData<T[P], P>
}

export interface FormClass<T extends FormModel> {
  readonly fields: Fields<T>

  /**
   * Sets form values
   *
   * @param values New form values
   * @param strict Validate that all fields exists in form. Default `true`
   * @
   */
  setValues(values: Partial<T> | undefined, strict?: boolean): void

  /**
   * Gets current form values
   */
  getValues(): T

  /**
   * Validates specific field(s)
   */
  validate(fields?: FieldsList<T>): Promise<boolean>

  /**
   * Sets errors and warnings for specific field(s)
   */
  setErrors(errors: ErrorsMapList<T>): void

  /**
   * Gets a value that indicates whether the form has error
   */
  hasError(): boolean

  /**
   * Gets a value that indicates whether the form has warning
   */
  hasWarn(): boolean

  /**
   * Handle form submit. Typically should be passed into `<form>`
   */
  handleSubmit(e: SynteticEvent): void
}

/**
 * Build form component
 *
 * Generic `T` - form model. Usefull to use your DTO object
 * Generic `TValidationResult` - Usefull to define strict validation result
 */
export const formBuilder = <T extends FormModel, TValidationResult = ValidationResult>(fieldDefs: FieldsDefs<T, TValidationResult>) => ({
  /**
   * Configure form options
   */
  configure: (options: FormOptions<T, TValidationResult>) => ({

    /**
     * React component to update
     * Typically you should pass `this` if form defined inside React component
     */
    build: (component: ReactComponent): FormClass<T> =>
      new Form(fieldDefs, {
        // Predefined config values:
        validateOnChange: false,
        validateOnBlur: true,
        ...options
      }, component)
  })
})

class Form<T extends FormModel, TValidationResult> implements FormClass<T> {
  private readonly _fieldDefs: FieldsDefs<T, TValidationResult>
  private readonly _options: FormOptions<T, TValidationResult>
  private readonly _component: ReactComponent
  readonly fields: Fields<T>
  private readonly _fieldsNames: ReadonlyArray<string>

  constructor(fieldDefs: FieldsDefs<T, TValidationResult>, options: FormOptions<T, TValidationResult>, component: ReactComponent) {
    this._fieldDefs = fieldDefs
    this._options = options
    this._component = component

    this.fields = {} as any
    const names: string[] = []

    for (const name of Object.keys(this._fieldDefs)) {
      this.fields[name] = {
        name,
        dirty: false,
        touched: false,
        error: null,
        warn: null,
        onFocus: () => this.onFocus(name),
        onBlur: () => this.onBlur(name),
        onChange: value => this.onChange(name, value)
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
    const fieldDef = this._fieldDefs[fieldName] as FieldDef<any, T>
    const validateFn = fieldDef.validate
    const warnFn = fieldDef.warn
    const field = this.fields[fieldName]

    if (validateFn)
      field.error = this.transformError(field, validateFn(field.value, this))

    if (warnFn)
      field.warn = this.transformError(field, warnFn(field.value, this))

    // Validate dependent fields
    const dependent = fieldDef.dependent

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
      const def = this._fieldDefs[fieldName] as FieldDef<any, T>
      if (def.validateOnBlur)
        this.validateField(fieldName)

      this.updateComponent()
    }
  }

  private onChange(fieldName: string, value: any) {
    const field = this.fields[fieldName]
    field.value = value
    field.dirty = true

    const fieldDef = this._fieldDefs[fieldName] as FieldDef<any, T>

    if (fieldDef.validateOnChange)
      this.validateField(fieldName)

    if (fieldDef.changed)
      fieldDef.changed(value, this)

    this.updateComponent()
  }

  private updateComponent() {
    this._component.forceUpdate()
  }
}