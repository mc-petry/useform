type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export interface FieldComponent {
  /**
   * Implements focus method
   * Needs to work `focusInvalidField`
   *
   * @returns Field is focused
   */
  focus?(): boolean
}

export interface FieldData<TValue = any, TName = string> {
  readonly name: TName

  /**
   * Gets a value that indicates whether a field value changed
   *
   * @default false
   */
  readonly dirty: boolean

  /**
   * Gets a value that indicated whether a field had a focus
   *
   * @default false
   */
  readonly touched: boolean

  /**
   * Gets field current value
   *
   * @default undefined
   */
  readonly value: TValue | undefined

  /**
   * Gets current field error
   *
   * @default null
   */
  readonly error: any

  /**
   * Gets current field warning
   *
   * @default null
   */
  readonly warn: any

  /**
   * Gets current field label
   * Use `transformers` to define field labels
   */
  readonly label: any

  readonly onFocus: () => void
  readonly onBlur: () => void
  readonly onChange: (value: TValue) => void

  readonly fieldRef: (r: FieldComponent | null) => void
}

interface FieldDef<TValue, TFields, TValidationResult = ValidationResult> {
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
interface ReactComponent { forceUpdate(): void }
type ValidationResult = any
type ValidateFn<V, T, R> = (value: V, form: FormClass<T>) => R
type ChangedFn<V, T> = (newValue: V, form: FormClass<T>) => void
type SubmitFn<T> = (values: T) => void
type FieldsList<T> = Array<Extract<keyof T, string>> | (Extract<keyof T, string>)
type FieldsDefs<T, TValidationResult> = { [P in keyof T]: FieldDef<T[P], T, TValidationResult> }

export interface FormTransformers<T, TValidationResult> {
  /**
   * Transform fields errors
   */
  error?: (error: TValidationResult, field: FieldData<any, keyof T>) => any

  /**
   * Define fields labels
   */
  label?: (field: FieldData<any, Extract<keyof T, string>>) => any
}

interface FormOptions<T, TValidationResult> {
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
   *
   * @default false
   */
  validateOnChange?: boolean

  /**
   * Default form behaviour. Keep in mind that pristine (not dirty) fields will not be validated
   *
   * @default true
   */
  validateOnBlur?: boolean
}

interface FormModel {
  [key: string]: any
}

export type ErrorsMapList<T> = {
  field: Extract<keyof T, string>
  error?: ValidationResult
  warn?: ValidationResult
}[]

type Fields<T> = {
  [P in keyof T]-?: Mutable<FieldData<T[P], Extract<P, string>>>
}

interface SetValuesFnOptions {
  /**
   * Validate that all fields exists in form.
   * @default true
   */
  strict?: boolean
  /**
   * Force update component.
   * @default false
   */
  update?: boolean
}

interface AddFieldFnArgs {
  name: string
  fieldDef?: FieldDef<any, any, any>
}

export interface FormClass<T extends FormModel> {
  readonly fields: Fields<T>

  /**
   * Sets form values
   *
   * @param values New form values
   * @param options
   */
  setValues(values: Partial<T> | undefined, options?: boolean | SetValuesFnOptions): void

  /**
   * Assign a field dynamically
   */
  addField(args: AddFieldFnArgs): void

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
  hasError(fields?: FieldsList<T>): boolean

  /**
   * Gets a value that indicates whether the form has warning
   */
  hasWarn(fields?: FieldsList<T>): boolean

  /**
   * Handle form submit. Typically should be passed into `<form>`
   */
  handleSubmit(e: SynteticEvent): void

  /**
   * Gets a value that indicates whether the form was touched
   */
  touched(): boolean
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
  private readonly _options: FormOptions<T, TValidationResult>
  private readonly _component: ReactComponent
  private readonly _fieldsComponents: { [P in keyof T]: FieldComponent | null } = {} as any
  private _fieldDefs: FieldsDefs<T, TValidationResult> = {} as any
  private _fieldsNames: Array<string> = []

  readonly fields: Fields<T>

  constructor(fieldDefs: FieldsDefs<T, TValidationResult>, options: FormOptions<T, TValidationResult>, component: ReactComponent) {
    this._options = options
    this._component = component
    this.fields = {} as any

    for (const name of Object.keys(fieldDefs)) {
      this.addField({ name, fieldDef: fieldDefs[name] })
    }
  }

  setValues(values: Partial<T> | undefined, options?: boolean | SetValuesFnOptions) {
    if (!values)
      return

    let strict: boolean | undefined = true
    let update

    if (typeof options === 'boolean') {
      strict = options
    }
    else if (typeof options !== 'undefined') {
      strict = options.strict
      update = options.update
    }

    for (const name of Object.keys(values)) {
      if (!this.fields[name])
        if (strict)
          throw new Error(`No specified field for name: "${name}"`)
        else
          continue

      this.fields[name].value = values[name]
    }

    if (update)
      this._component.forceUpdate()
  }

  getValues(): T {
    const values: Partial<T> = {}
    this._fieldsNames.forEach(name => values[name] = this.fields[name].value)

    return values as T
  }

  async validate(fields: FieldsList<T> = this._fieldsNames as FieldsList<T>) {
    if (typeof fields === 'string') {
      this.validateField(fields)
    }
    else {
      for (const name of fields)
        this.validateField(name)
    }

    this.updateComponent()

    const hasError = this.hasError()

    if (hasError) {
      this.focusInvalidField()
    }

    return !hasError
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

  hasError(fields: FieldsList<T> = this._fieldsNames as FieldsList<T>) {
    let hasError = false

    if (typeof fields === 'string') {
      if (this.fields[fields].error)
        hasError = true
    } else {
      for (const name of fields) {
        if (this.fields[name].error) {
          hasError = true
          break
        }
      }
    }

    return hasError
  }

  hasWarn(fields: FieldsList<T> = this._fieldsNames as FieldsList<T>) {
    let hasWarn = false

    if (typeof fields === 'string') {
      if (this.fields[fields].warn)
        hasWarn = true
    } else {
      for (const name of fields) {
        if (this.fields[name].warn) {
          hasWarn = true
          break
        }
      }
    }

    return hasWarn
  }

  touched() {
    let touched = false

    for (const name of this._fieldsNames) {
      if (this.fields[name].touched) {
        touched = true
        break
      }
    }

    return touched
  }

  focusInvalidField() {
    for (const name of this._fieldsNames) {
      const field = this.fields[name]

      if (field.error) {
        const component = this._fieldsComponents[name]

        if (component && component.focus && component.focus())
          return
      }
    }
  }

  addField({ name, fieldDef }: AddFieldFnArgs) {
    const transformers = this._options.transformers

    const field = this.fields[name] = {
      name,
      label: undefined,
      dirty: false,
      touched: false,
      error: null,
      warn: null,
      value: undefined,

      onFocus: () => this.onFocus(name),
      onBlur: () => this.onBlur(name),
      onChange: value => this.onChange(name, value),

      fieldRef: (instance: FieldComponent | null) => this._fieldsComponents[name] = instance
    }

    field.label = transformers && transformers.label
      ? transformers.label(this.fields[name as keyof T])
      : name

    if (!this._fieldsNames.includes(name)) {
      this._fieldsNames.push(name)

      this._fieldDefs[name] = fieldDef || {}
    }
  }

  private transformError(field: FieldData, error: any) {
    const transformers = this._options.transformers

    return error
      ? transformers && transformers.error
        ? transformers.error(error, field)
        : error
      : null
  }

  private validateField(fieldName: keyof T) {
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
    if (!this.fields[fieldName].dirty)
      return

    const def = this._fieldDefs[fieldName]

    const validateOnBlur = def.validateOnBlur != null
      ? def.validateOnBlur
      : this._options.validateOnBlur!

    if (validateOnBlur)
      this.validateField(fieldName)

    this.updateComponent()
  }

  private onChange(fieldName: string, value: any) {
    const field = this.fields[fieldName]

    field.value = value
    field.dirty = true

    const fieldDef = this._fieldDefs[fieldName]

    // Validate
    const validateOnChange = fieldDef.validateOnChange != null
      ? fieldDef.validateOnChange
      : this._options.validateOnChange

    if (validateOnChange)
      this.validateField(fieldName)

    // Handle changed event
    if (fieldDef.changed)
      fieldDef.changed(value, this)

    this.updateComponent()
  }

  private updateComponent() {
    this._component.forceUpdate()
  }
}