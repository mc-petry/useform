import { useForm } from '@mc-petry/useform'
import { AnimatePresence, motion } from 'framer-motion'
import { useReducer, useState } from 'react'
import { CButton } from '~/ui/button'
import { CForm } from '~/ui/forms/form'
import { CTextField } from '~/ui/forms/text-field'

export function VExamplesDynamic() {
  const [formId, increaseFormId] = useReducer(s => s + 1, 0)
  const [fieldNames, setFieldNames] = useState(['name'])
  const form = useForm<Record<string, string>>(
    {
      dynamic: () => ({
        validate: (v: string) => (!v && 'required') || (v.length < 2 && 'min-length'),
      }),
      transformers: {
        label: name => name[0].toUpperCase() + name.substr(1),
      },
    },
    [formId]
  )

  const { fields } = form

  return (
    <CForm form={form}>
      <AnimatePresence>
        {fieldNames.map(name => {
          const field = fields[name]
          return (
            <motion.div
              key={name}
              initial={{ height: 0, overflow: 'hidden' }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
            >
              <CTextField field={field} label={field.label} />
            </motion.div>
          )
        })}
      </AnimatePresence>

      <CForm.Actions>
        <CButton intent="primary" onClick={() => setFieldNames(s => [...s, `name ${s.length + 1}`])}>
          {'Add'}
        </CButton>
        <CButton
          disabled={Object.keys(form.fields).length === 1}
          onClick={() => {
            setFieldNames(['rebuilded'])
            increaseFormId()
          }}
        >
          {'Rebuild'}
        </CButton>
      </CForm.Actions>
    </CForm>
  )
}
