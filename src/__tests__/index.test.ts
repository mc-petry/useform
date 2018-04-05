import { SynteticEvent, formBuilder } from '../'

// tslint:disable-next-line:no-empty
const fakeReactComponent = { forceUpdate: () => { } }

const synteticEvent: SynteticEvent = {
  // tslint:disable-next-line:no-empty
  preventDefault: () => { }
}

describe('simple form', () => {
  interface UserDTO {
    nick: string
    name: string
    age: number
    gender?: boolean
  }

  // , { id: string } | string
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
    const { onBlur, onChange, onFocus, ...state } = fields.nick
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

  const form = formBuilder<FormFields, { id: string } | string>(
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
        error: (error, field) => typeof error === 'object'
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