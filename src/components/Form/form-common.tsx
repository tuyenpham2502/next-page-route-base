'use client'

import { Form } from 'antd'

type FormCommonProps = {
  children: any
  onFinish: () => void // Replace Function with a more specific function type
  layout?: 'horizontal' | 'vertical' | 'inline'
  name: string
  className?: string
  rest?: any
}

export const FormCommon = (props: FormCommonProps) => {
  const { children, onFinish, layout = 'vertical', name, className, ...rest } = props
  return (
    <Form name={name} onFinish={onFinish} layout={layout} {...rest} className={className}>
      {children}
    </Form>
  )
}
