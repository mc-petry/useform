import { } from '@emotion/core'
import css from '@emotion/css'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Field, useForm } from 'react-forms-builder'

interface UserData {
  name: string
  age: number
}

function FieldError({ field }: { field: Field }) {
  return field.error && <div
    css={css`
      padding: 5px;
      color: #f00;
    `}
  >
    {field.error}
  </div>
}

function TextField({ field }: { field: Field }) {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    field.onChange(e.target.value),
    []
  )

  return <div>
    <input
      css={css`
        border: 1px solid #aaa;
        border-radius: 2px;
        height: 28px;
        padding: 0 8px;
        color: #555;
      `}
      ref={field.ref as any}
      value={field.value || ''}
      onChange={onChange}
      onBlur={field.onBlur}
      type="text"
    />
    <FieldError field={field} />
  </div>
}

function NumberField({ field }: { field: Field }) {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    field.onChange(parseInt(e.target.value, 10)),
    []
  )

  return <div>
    <input
      css={css`
        border: 1px solid #aaa;
        border-radius: 2px;
        height: 28px;
        padding: 0 8px;
        color: #555;
      `}
      ref={field.ref as any}
      value={field.value || ''}
      onChange={onChange}
      onBlur={field.onBlur}
      type="number"
    />
    <FieldError field={field} />
  </div>
}

function SimpleForm() {
  const { fields, handleSubmit, reset } = useForm<UserData>(
    {
      name: {
        validate: (() => {
          console.log('create')
          return (value: string | undefined) => !value && 'required'
        })()
      },

      age: {
        validate: value => (
          (!value && 'required') ||
          (value! < 18 && 'too young')
        ),
        validateOnChange: true
      }
    },
    {
      submit: values => {
        console.log(values)
      }
    })

  const handleReset = useCallback(() => reset(), [])

  return <form onSubmit={handleSubmit}>
    Default:
    <TextField field={fields.name} />

    Validate on change:
    <NumberField field={fields.age} />
    <button type="submit">{'Submit'}</button>
    <button type="button" onClick={handleReset}>reset</button>
  </form>
}

export default function Home() {
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    setRendered(true)
  })

  return <div>
    {rendered && <SimpleForm />}
  </div>
}
