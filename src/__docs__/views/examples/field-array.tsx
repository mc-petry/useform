import { css } from '@emotion/react'
import { Field, fieldArrayAddItem, useFieldArray, useForm } from '@mc-petry/useform'
import { AnimatePresence, motion } from 'framer-motion'
import { IconReset } from '~/icons'
import { CButton } from '~/ui/button'
import { CForm } from '~/ui/forms/form'
import { CTextField } from '~/ui/forms/text-field'

interface Animal {
  name: string
}

interface AnimalGroup {
  group: string
  animals: Animal[]
}

export function VExamplesFieldArray() {
  const form = useForm<AnimalGroup>({
    initial: {
      group: 'Mammal',
      animals: [
        {
          name: 'Kangaroo',
        },
      ],
    },
  })
  const { fields } = form

  return (
    <CForm form={form}>
      <CTextField field={fields.group} label={'Group'} />
      Animals:
      <AnimatePresence>
        {fields.animals.value!.map((x, i) => (
          <motion.div
            key={i}
            css={styles}
            initial={{ height: 0, overflow: 'hidden' }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
          >
            <AnimalForm field={fields.animals} index={i} />
          </motion.div>
        ))}
      </AnimatePresence>
      <CForm.Actions>
        <CButton intent="primary" onClick={() => fieldArrayAddItem(fields.animals, { name: '' })}>
          {'Add animal'}
        </CButton>
        <CButton type="reset" icon="reset" disabled={!form.touched()}>
          <IconReset />
        </CButton>
      </CForm.Actions>
    </CForm>
  )
}

interface AnimalFormProps {
  field: Field<Animal[]>
  index: number
}

function AnimalForm({ field, index }: AnimalFormProps) {
  const { fields } = useFieldArray(field, index)

  return (
    <div>
      <CTextField field={fields.name} label={'Name'} />
    </div>
  )
}

const styles = {
  fieldArray__item: css``,
}
