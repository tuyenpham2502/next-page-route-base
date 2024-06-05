import { Button } from 'antd'
import styled from 'styled-components'

type Props = {
  bg?: string
  color?: string
  fontSize?: string
  border?: string
  borderRadius?: string
  minheight?: string
  minWidth?: string
  fontWeight?: string
}
export const ButtonCommon = styled(Button)<Props>`
  &:hover,
  &:focus,
  & {
    min-width: ${(props) => (props.minWidth ? props.minWidth : '90px')};
    min-height: ${(props) => (props.minheight ? props.minheight : '')};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '8px')};
    background: ${(props) => (props.bg ? props.bg : '#D53131')};
    color: ${(props) => (props.color ? props.color : 'white')};
    border: ${(props) => (props.border ? props.border : 'none')};
    font-size: ${(props) => (props.fontSize ? props.fontSize : '16px')};
    font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '600')};
    width: 100%;
    height: 100%;
  }
`
