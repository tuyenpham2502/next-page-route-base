import { Input } from 'antd'
import Form, { Rule } from 'antd/es/form'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

export const InputOtpCommonStyled = styled(Input.OTP)``

type InputOtpCommonProps = {
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
  autoFocus: boolean
  length: number
  onChange: any
}

export const InputOtpCommon = (props: InputOtpCommonProps) => {
  const {
    name,
    label,
    rules,
    dataAtrribute,
    attribute,
    onCallbackFunction,
    setData,
    size,
    autoFocus = false,
    length,
    onChange,
    ...rest
  } = props

  const [value, setValue] = useState<string>('')

  // const onChange = (e: any) => {
  //   setValue(e)
  //   if (onCallbackFunction) {
  //     onCallbackFunction(e)
  //   } else {
  //     setData({
  //       [attribute]: e,
  //     })
  //   }
  // }

  useEffect(() => {
    if (dataAtrribute) {
      setValue(dataAtrribute)
    }
  }, [dataAtrribute])

  return (
    <Form.Item name={name} label={label} rules={rules}>
      <InputOtpCommonStyled
        length={length}
        autoFocus={autoFocus}
        size={size ?? 'large'}
        value={value}
        onChange={onChange}
        inputMode='numeric'
        {...rest}
      />
    </Form.Item>
  )
}
