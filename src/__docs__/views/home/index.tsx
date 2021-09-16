import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { CLogo } from '../../ui/logo'
import { VHomeCBenefits } from './@benefits'

interface DeepObject {
  phone: string
}

interface Address {
  city: string
  lane: string
  phone: DeepObject[]
}

export function VHome() {
  const part1 = '@mc-petry/'
  const part2 = 'useform'
  const stagger = 0.07

  return (
    <div>
      <CLogo css={styles.logo} />
      <div css={styles.intro}>
        <div css={styles.home__prefix}>
          {part1.split('').map((x, i) => (
            <motion.div
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * stagger }}
            >
              {x}
            </motion.div>
          ))}
        </div>
        <div css={styles.home__use}>
          {part2.split('').map((x, i) => (
            <motion.div
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i + part1.length) * stagger }}
            >
              {x}
            </motion.div>
          ))}
        </div>
      </div>
      <VHomeCBenefits />
    </div>
  )
}

const styles = {
  logo: css`
    width: 192px;
    height: 192px;
    margin: 100px auto;
  `,

  intro: css`
    margin: 0 auto 60px;
    color: #ddd;
    font-size: 32px;
    text-align: center;
  `,

  home__use: css`
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 28px;
  `,

  home__prefix: css`
    display: inline;
    color: #594e6a;
  `,

  content: css`
    color: #eee;
    max-width: 1000px;
    margin: 0 auto;
  `,
}

// export function VHome() {
//   const { fields, handleSubmit, reset, getValues } = useForm<{
//     firstName: string
//     lastName: string
//     address: Address[]
//     info: {
//       nickname: string
//       user?: string
//     }
//   }>({
//     fields: {
//       firstName: {
//         validateOnChange: true,
//         validateOnBlur: false,
//       },
//     },
//     validationSchema: {
//       firstName: v => !v && 'required',
//     },
//     initialValues: {
//       firstName: 'John',
//       address: [
//         {
//           city: 'Kharkiv',
//           lane: '',
//           phone: [
//             {
//               phone: '',
//             },
//             {
//               phone: '+380664449992',
//             },
//           ],
//         },
//       ],
//       info: {
//         nickname: 'test',
//       },
//     },
//   })

//   const { fields: info } = useFormNested(fields.info, {
//     fields: {
//       nickname: {
//         validate: v => !v && 'required',
//       },
//     },
//     validationSchema: {
//       user: v => !v && 'user',
//     },
//   })

//   return (
//     <div>
//       <div css={styles.intro}>Create strongly typed forms in the easiest way</div>
//       <div css={styles.content}>
//         <form onSubmit={handleSubmit(values => alert(JSON.stringify(values)))} onReset={() => reset()}>
//           {/* <TextField field={fields.firstName} label="First Name" />
//           <TextField field={fields.lastName} label="Last Name" />
//           Home address:
//           {JSON.stringify(fields.address.value)}
//           {fields.address.value!.map((x, i) => (
//             <SubForm key={i} index={i} field={fields.address} />
//           ))} */}
//           Nested:
//           <TextField field={info.nickname} label="Info nickname" />
//           <TextField field={info.user} label="Info user" />
//           <Button type="submit">{'Submit'}</Button>
//           <Button type="reset">{'reset'}</Button>
//         </form>
//       </div>
//       {JSON.stringify(getValues())}
//     </div>
//   )
// }

// const styles = {
//   intro: css`
//     max-width: 600px;
//     padding: 100px 0;
//     margin: 0 auto;
//     color: #fff;
//     font-size: 48px;
//     text-align: center;
//   `,

//   content: css`
//     color: #eee;
//     max-width: 1000px;
//     margin: 0 auto;
//   `,
// }

// function SubForm({ index, field }: { index: number; field: Field<Address[]> }) {
//   const { fields } = useFormArray(index, field, {
//     fields: {
//       city: {
//         validateOnChange: true,
//       },
//     },
//     validationSchema: {
//       city: v => !v && 'required',
//       lane: v => !v && 'required',
//     },
//   })

//   return (
//     <div>
//       Nested [ {index} ]:
//       <TextField label={'City'} field={fields.city} />
//       <TextField label={'Lane'} field={fields.lane} />
//       Phones:
//       {fields.phone.value!.map((x, i) => (
//         <DeepSubform key={i} index={i} field={fields.phone} />
//       ))}
//     </div>
//   )
// }

// function DeepSubform({ index, field }: { index: number; field: Field<DeepObject[]> }) {
//   const { fields } = useFormArray(index, field, {
//     validationSchema: {
//       phone: v => v !== '000' && 'Not 000',
//     },
//   })

//   return (
//     <div>
//       Deep nested [ {index} ]:
//       <TextField label={'City'} field={fields.phone} />
//     </div>
//   )
// }
