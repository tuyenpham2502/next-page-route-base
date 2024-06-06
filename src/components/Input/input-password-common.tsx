'use client'

import { Form } from 'antd'
import { Rule } from 'antd/es/form'
import { useEffect, useState } from 'react'

import { InputTextCommonStyled } from '@/components/Input/input-text-common'

type InputPasswordCommonProps = {
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
  autoFocus?: boolean
}

export const InputPasswordCommon = (props: InputPasswordCommonProps) => {
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
    autoFocus = false,
    ...rest
  } = props
  const [value, setValue] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
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
      <InputTextCommonStyled.Password
        name='password'
        autoFocus={autoFocus}
        size={size ?? 'large'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
        {...rest}
      />
    </Form.Item>
  )
}
