import { formBuilder, SynteticEvent } from '../'

const synteticEvent: SynteticEvent = {
  // tslint:disable-next-line:no-empty
  preventDefault: () => { }
}

describe('form', () => {
  interface UserDTO {
    name: string
    age: number
  }

  // const form = formBuilder<UserDTO>({
  //   age: {
  //     validateFn: (value, { fields }) =>
  //       !value && 'required'
  //   },

  //   name: {
  //     validateFn: value => value
  //   }
  // })

  const form = formBuilder<UserDTO>(field =>
    ({
      name: field()
        .validate((value, { fields }) => fields.age.value < 0 && 'bad'),

      age: field()
        .validate(value =>
          (!value && 'required') ||
          (value && value < 18 && 'lessThan18')
        )
    }))
    .configure({

    })
    .build({
      forceUpdate: () => {
        // TODO
      }
    })

  test('validate', () => {
    form.setValues({ age: 17 })
    form.handleSubmit(synteticEvent)

    expect(form.fields.age.error).toBe('lessThan18')
  })
})