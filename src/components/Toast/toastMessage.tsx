import { ToastContent, toast } from 'react-toastify'

import Constants from 'src/utils/constants'
/**
 * Show toast message, if you leave the message as null or empty, it will show title only
 * @param translator
 * @param title
 * @param message
 */
export const notifyInfo = (translator: any, message?: ToastContent) => {
  toast.info(message || 'Info', {
    className: `bg-blue-D7F1FD text-blue-0C2A75 rounded-lg`,
    position: Constants.ToastMessage.Notification.Position,
    autoClose: Constants.ToastMessage.Notification.Duration,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  })
}

export const notifySuccess = (translator: any, message?: ToastContent) => {
  toast.success(message || 'Success', {
    className: `bg-green-84D65A text-green-2B641E rounded-lg`,
    position: Constants.ToastMessage.Notification.Position,
    autoClose: Constants.ToastMessage.Notification.Duration,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  })
}

export const notifyError = (translator: any, message?: ToastContent) => {
  toast.error(message || 'Error', {
    className: `bg-red-FCE8DB text-brown-71192F rounded-lg`,
    position: Constants.ToastMessage.Notification.Position,
    autoClose: Constants.ToastMessage.Notification.Duration,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  })
}

export const notifyWarning = (translator: any, message?: ToastContent) => {
  toast.warning(message || 'Warning', {
    className: `bg-yellow-FEF7D1 rounded-lg`,
    position: Constants.ToastMessage.Notification.Position,
    autoClose: Constants.ToastMessage.Notification.Duration,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    theme: 'light',
  })
}
