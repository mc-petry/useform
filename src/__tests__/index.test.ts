import { SynteticEvent, formBuilder } from '../'

const synteticEvent: SynteticEvent = {
  // tslint:disable-next-line:no-empty
  preventDefault: () => { }
}

describe('form', () => {
  interface UserDTO {
    name: string
    age: number
    gender?: boolean
  }

  const form = formBuilder<UserDTO, { id: string } | string>(
    {
      name: {
        validate: (value, { fields }) => fields.age.value < 0 && 'bad',
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
    .configure({
      submit: () => { },
      transformers: {
        label: field => field.name,
        error: (error, field) => typeof error !== 'string' ? error.id : error
      }
    })
    // tslint:disable-next-line:no-empty
    .build({ forceUpdate: () => { } })

  test('common', () => {
    expect(form.fields.gender.name).toBe('gender')
  })

  test('validate', () => {
    form.setValues({ age: 17 })
    form.handleSubmit(synteticEvent)

    expect(form.fields.age.error).toBe('lessThan18')
  })
})