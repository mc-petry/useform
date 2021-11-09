import { css } from '@emotion/react'
import { Field, useFieldFocus, useFieldWatch } from '@mc-petry/useform'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { CFieldMessage } from '~/ui/forms/field-message'

export interface TextFieldProps {
  field: Field<string> | Field<string | undefined>
  label: string
  disabled?: boolean
  type?: 'text' | 'password'
}

export function CTextField({ field, label }: TextFieldProps) {
  useFieldWatch(field)
  const focused = useFieldFocus(field)

  const hasPlaceholder = !field.value && !focused

  const animate = useAnimation()

  useEffect(() => {
    if (field.error) {
      animate.start({
        x: [16, -16, 12, -12, 8, -8, 0],
        transition: {
          duration: 0.7,
          ease: 'easeOut',
        },
      })
    }
  }, [field.error])

  return (
    <div css={styles.wrapper}>
      <motion.div
        css={[
          //
          styles.field,
          focused && styles.field_focused,
          field.error && styles.field_error,
        ]}
        animate={animate}
        onClick={() => field.ref.current?.focus()}
      >
        <div
          css={[
            //
            styles.field__label,
            hasPlaceholder && styles.field__label_hasPlaceholder,
            focused && styles.field__label_focused,
          ]}
        >
          {label}
        </div>
        <input
          css={styles.field__input}
          ref={field.ref as React.RefObject<HTMLInputElement>}
          value={field.value || ''}
          onChange={e => field.onChange(e.target.value)}
          onFocus={() => field.onFocus()}
          onBlur={() => field.onBlur()}
          type="text"
        />
      </motion.div>
      <CFieldMessage field={field} />
    </div>
  )
}

const styles = {
  wrapper: css`
    margin: 0 0 24px;
  `,

  field: css`
    position: relative;
    z-index: 1;
    padding: 38px 24px 0;
    height: 80px;
    background: #0c0b0e;
    box-shadow: inset 0 0 0 2px #0000;
    border-radius: 24px;
    transition: all 0.15s;
    cursor: text;
  `,

  field_focused: css`
    box-shadow: inset 0 0 0 2px #5290f7;
    background: #000;
  `,

  field_error: css`
    box-shadow: inset 0 0 0 2px #912e16;
  `,

  field__label: css`
    position: absolute;
    left: 24px;
    top: 18px;
    font-size: 15px;
    color: #888;
    transform-origin: 0 50%;
    transition: all 0.3s cubic-bezier(0.18, 0.9, 0.55, 1.28);
    pointer-events: none;
  `,

  field__label_hasPlaceholder: css`
    transform: translateY(15px) scale(1.5);
    color: #797581;
  `,

  field__label_focused: css`
    color: #82a8eb;
  `,

  field__input: css`
    width: 100%;
    padding: 0;
    line-height: 1.5;
    background: none;
    border: none;
    color: #efecf1;
    outline: none;
    font-family: 'Overpass';
    font-size: 20px;
  `,
}
