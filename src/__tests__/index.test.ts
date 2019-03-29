import { formBuilder } from '../'

const fakeReactComponent = { forceUpdate: () => ({}) }

describe('simple form', () => {
  interface UserDTO {
    nick: string
    name: string
    age: number
    gender?: boolean
  }

  const form = formBuilder<UserDTO>(
    {
      nick: {
        validate: value => value !== '1' && '!1',
        warn: value => value !== '2' && '!2'
      },

      name: {
        validate: value => value.length < 3 && 'min-length',
      },

      age: {
        validate: value =>
          (!value && 'required') ||
          (value < 18 && 'lessThan18')
      },

      gender: {
        validate: value =>
          !value && ({ id: 'extended' })
      }
    })
    .configure({})
    .build(fakeReactComponent)

  const { fields } = form

  test('initial field state', () => {
    const { onBlur, onChange, onFocus, fieldRef, ...state } = fields.nick
    const compare: typeof state = {
      name: 'nick',
      label: 'nick',
      dirty: false,
      touched: false,
      value: undefined,
      error: null,
      warn: null
    }

    expect(state).toEqual(compare)
  })

  test('field state', () => {
    fields.nick.onFocus()

    expect(fields.nick.touched).toBeTruthy()

    fields.nick.onChange('some')

    expect(fields.nick.dirty).toBeTruthy()
  })

  test('field validate', () => {
    fields.nick.onChange('0')
    fields.nick.onBlur()

    expect(fields.nick.error).toBe('!1')
    expect(fields.nick.warn).toBe('!2')

    fields.nick.onChange('1')
    fields.nick.onBlur()

    expect(fields.nick.error).toBeNull()
    expect(fields.nick.warn).toBe('!2')

    fields.nick.onChange('2')
    fields.nick.onBlur()

    expect(fields.nick.error).toBe('!1')
    expect(fields.nick.warn).toBeNull()
  })
})

describe('form transformers', () => {
  interface FormFields {
    err1: string
    err2: string
  }

  const form = formBuilder<FormFields, { id: string } | string | false>(
    {
      err1: {
        validate: value => !value && 'test1'
      },

      err2: {
        validate: value => !value && { id: 'test2' }
      }
    })
    .configure({
      transformers: {
        label: field => `my-${field.name}`,
        error: (error, _field) => typeof error === 'object'
          ? { map: error.id }
          : { map: error }
      }
    })
    .build(fakeReactComponent)

  const { fields } = form

  test('error', () => {
    form.validate()

    expect(fields.err1.error).toEqual({ map: 'test1' })
    expect(fields.err2.error).toEqual({ map: 'test2' })
  })

  test('label', () => {
    expect(fields.err1.label).toBe(`my-${fields.err1.name}`)
  })
})

describe('form renders', () => {
  let renderCount = 1
  const localFakeReactComponent = { forceUpdate: () => { renderCount++ } }

  const form = formBuilder({})
    .configure({})
    .build(localFakeReactComponent)

  test('set values', () => {
    form.setValues({
      name: 'alex'
    }, false)

    expect(renderCount).toBe(1)

    expect(() => {
      form.setValues({
        name: 'mick'
      }, true)
    }).toThrow()

    form.setValues({ name: 'ivan' }, { update: true })

    expect(renderCount).toBe(2)
  })
})

describe('form dynamic fields', () => {
  const localFakeReactComponent = { forceUpdate: () => ({}) }

  const form = formBuilder<any>({})
    .configure({})
    .build(localFakeReactComponent)

  test('assign a field dynamically', () => {
    expect(form.fields).toEqual({})

    form.addField({
      name: 'email',
      fieldDef: {
        validate: value => !value && 'required'
      }
    })

    const { onBlur, onChange, onFocus, fieldRef, ...state } = form.fields.email
    const compare: typeof state = {
      name: 'email',
      label: 'email',
      dirty: false,
      touched: false,
      value: undefined,
      error: null,
      warn: null
    }

    expect(state).toEqual(compare)
  })

  test('validation result - lastName value required', () => {
    form.addField({
      name: 'lastName',
      fieldDef: {
        validate: value => !value && 'required'
      }
    })

    form.validate()

    expect(form.fields.lastName.error).toEqual('required')
  })

  test('validation result - everything is ok', () => {
    form.addField({
      name: 'lastName',
      fieldDef: {
        validate: value => !value && 'required'
      }
    })

    form.setValues({
      lastName: 'Downey'
    })

    form.validate()

    expect(form.fields.lastName.error).toEqual(null)
  })

  test('check methods dynamically added fields', () => {
    form.addField({
      name: 'phoneNumber'
    })

    form.fields.phoneNumber.onChange('text')
  })

  test('has field phoneNumber', () => {
    expect(form.fields.phoneNumber).toBeTruthy()
  })

  test('doesn`t has field phoneNumber', () => {
    form.removeFields('phoneNumber')

    expect(form.fields.phoneNumber).toBeFalsy()
  })

  test('throw error when removed not existed field with strict option', () => {
    expect(() => form.removeFields('field', { strict: true })).toThrow()
  })
})

describe('form validation with params', () => {
  const localFakeReactComponent = { forceUpdate: () => ({}) }

  const form = formBuilder<any>({})
    .configure({})
    .build(localFakeReactComponent)

  test('validate errors and warns without params', () => {
    form.addField({
      name: 'errorField',
      fieldDef: {
        validate: value => !value && 'required',
        warn: value => !value && 'warn-required'
      }
    })

    form.addField({
      name: 'notErrorField',
      fieldDef: {
        validate: value => !value && 'required',
        warn: value => !value && 'warn-required'
      }
    })


    form.setValues({
      notErrorField: 'text'
    })

    form.validate()

    expect(form.fields.errorField.error).toBe('required')
    expect(form.fields.notErrorField.error).toBe(null)
    expect(form.fields.errorField.warn).toBe('warn-required')
    expect(form.fields.notErrorField.warn).toBe(null)
  })

  test('validate errors and warns with params', () => {
    expect(form.hasError('errorField')).toBe(true)
    expect(form.hasWarn('errorField')).toBe(true)
    expect(form.hasError(['errorField'])).toBe(true)
    expect(form.hasWarn(['errorField'])).toBe(true)
    expect(form.hasError('notErrorField')).toBe(false)
    expect(form.hasWarn('notErrorField')).toBe(false)
    expect(form.hasError(['notErrorField'])).toBe(false)
    expect(form.hasWarn(['notErrorField'])).toBe(false)
  })
})