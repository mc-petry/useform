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

class Q {
  render() {
    return 0
  }
}

export interface Test {
  test?(): void
}

export class Test extends Q {

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
type FieldsList<T> = ReadonlyArray<Extract<keyof T, string>> | (Extract<keyof T, string>)
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

export interface FormClass<T extends FormModel> {
  readonly fields: Fields<T>

  /**
   * Sets form values
   *
   * @param values New form values
   * @param strict Validate that all fields exists in form. Default `true`
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
  private readonly _fieldDefs: FieldsDefs<T, TValidationResult>
  private readonly _options: FormOptions<T, TValidationResult>
  private readonly _component: ReactComponent
  private readonly _fieldsNames: ReadonlyArray<string>
  private readonly _fieldsComponents: { [P in keyof T]: FieldComponent | null } = {} as any

  readonly fields: Fields<T>

  constructor(fieldDefs: FieldsDefs<T, TValidationResult>, options: FormOptions<T, TValidationResult>, component: ReactComponent) {
    this._fieldDefs = fieldDefs
    this._options = options
    this._component = component
    this.fields = {} as any

    const names: string[] = []
    const transformers = this._options.transformers

    for (const name of Object.keys(this._fieldDefs)) {

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