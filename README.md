![](./logo.png)

# Forms builder

[![npm version](https://badge.fury.io/js/forms-builder.svg)](https://badge.fury.io/js/forms-builder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

Imagine that validating and submitting form can be so simple

## Installation

```bash
npm install forms-builder --save
```

## Samples

### Custom input

One way to write a field component:

```tsx
interface OwnProps {
  // Your input props
}

type ComponentProps =
  OwnProps &
  FieldData<string>

export class TextField extends React.Component {
  render() {
    const { value, label } = this.props

    return <input
      type="text"
      onFocus={this.props.onFocus}
      onBlur={this.props.onBlur}
      onChange={this.onChange}
      value={value != null ? value : ''}
    />
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.currentTarget.value)
  }
}
```

### Simple form

```tsx
interface LoginDTO {
  login: string
  password: string
}

class ComponentWithForm extends React.Component {
  form = formBuilder<LoginDTO>(
    {
      login: {
        validate: value => !value && 'required'
      },

      password: {
        validate: value => !value && 'required'
      }
    })
    .configure({
      submit: values => {
        // TODO...
      }
    })
    .build(this)

  render() {
    const { fields, handleSubmit } = this.form

    return <form onSubmit={handleSubmit}>
      <TextField {...fields.login} />
      <TextField {...fields.password} />
      <Button type="submit">Login</Button>
    </form>
  }
}
```

## Api

Project written in TypeScript. So all api have intellisense!