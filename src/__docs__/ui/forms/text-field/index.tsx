import { css } from '@emotion/react'
import { Field, useFieldFocus, useFieldWatch } from '@mc-petry/useform'
import { FieldMessage } from '~/ui/forms/field-message'

export interface TextFieldProps {
  field: Field<string> | Field<string | undefined>
  label: string
  disabled?: boolean
  type?: 'text' | 'password'
}

export function TextField({ field, label }: TextFieldProps) {
  useFieldWatch(field)
  const focused = useFieldFocus(field)

  const hasPlaceholder = !field.value && !focused

  return (
    <div
      css={[
        //
        styles.field,
        focused && styles.field_focused,
        field.error && styles.field_error,
      ]}
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
      <FieldMessage field={field} />
    </div>
  )
}

const styles = {
  field: css`
    position: relative;
    padding: 36px 24px 0;
    margin: 0 0 24px;
    height: 80px;
    background: #000;
    box-shadow: inset 0 0 0 2px #3c3744;
    border-radius: 14px;
    transition: all 0.15s;
    cursor: text;
  `,

  field_focused: css`
    box-shadow: inset 0 0 0 2px #5290f7;
  `,

  field_error: css``,

  field__label: css`
    position: absolute;
    left: 24px;
    top: 16px;
    font-size: 16px;
    color: #92bb92;
    transform-origin: 0 50%;
    transition: all 0.3s cubic-bezier(0.18, 0.9, 0.55, 1.28);
    pointer-events: none;
  `,

  field__label_hasPlaceholder: css`
    transform: translateY(17px) scale(1.7);
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
    font-size: 24px;
  `,
}
