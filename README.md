<p align="center">
<img src="./logo.png">
</p>

# use form


[![npm](https://img.shields.io/npm/v/react-useforms.svg)](https://www.npmjs.com/package/forms-builder)
[![Travis](https://img.shields.io/travis/mc-petry/forms-builder.svg)](https://travis-ci.org/mc-petry/forms-builder)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)


## Overview

Imagine that validating and submitting form can be so simple.

## Installation

```
npm i @mc-petry/useform
```

## Usage

Step 1: Create custom fields:
```tsx
import { ChangeEvent, useCallback } from 'react'
import { Field } from 'react-useform'

function TextField({ field }: { field: Field }) {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    field.onChange(e.target.value),
    []
  )

  return <div>
    <input
      ref={field.ref as any}
      value={field.value || ''}
      onChange={onChange}
      onBlur={field.onBlur}
      type="text"
    />
  </div>
}
```

Step 2: Create form:
```tsx
interface FormFields {
  name: string
}

function MyForm() {
  const { fields, handleSubmit } = useForm<FormFields>()

  return <form onSubmit={handleSubmit}>
    <TextField field={fields.name} />
    <button type="submit">Submit</button>
  </form>  
}
```