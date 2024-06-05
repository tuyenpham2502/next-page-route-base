'use client'

import { Form, Input } from 'antd'
import { Rule } from 'antd/es/form'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export const InputTextCommonStyled = styled(Input)``

type InputTextCommonProps = {
  name?: string
  label?: string
  placeholder?: string
  rules?: Rule[]
  attribute: string
  setData: any
  dataAtrribute: string
  onCallbackFunction?: any
  size?: 'small' | 'middle' | 'large'
  rest?: any
  autoComplete?: string
  autoFocus: boolean
}

export const InputTextCommon = (props: InputTextCommonProps) => {
  const {
    name,
    label,
    placeholder,
    rules,
    dataAtrribute,
    attribute,
    onCallbackFunction,
    setData,
    size,
    autoComplete,
    autoFocus = false,
    ...rest
  } = props
  const [value, setValue] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (onCallbackFunction) {
      onCallbackFunction(e.target.value)
    } else {
      setData({
        [attribute]: e.target.value,
      })
    }
  }

  useEffect(() => {
    if (dataAtrribute) {
      setValue(dataAtrribute)
    }
  }, [dataAtrribute])
  return (
    <Form.Item name={name} label={label} rules={rules}>
      <InputTextCommonStyled
        name={name}
        autoFocus={autoFocus}
        autoComplete={autoComplete ?? ''}
        size={size ?? 'large'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </Form.Item>
  )
}
