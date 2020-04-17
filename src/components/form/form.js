import React from 'react'
import cx from 'classnames'
import { Form } from '../Bootstrap';
// import './Form.css'

export function Label({ className, ...props }) {
  return (
    <Form.Label className={cx('Label', className)} {...props} />
  )
}

export const Input =  React.forwardRef(({ className, nameProp, type, ...props }, ref) => {
  return (
    <Form.Control className={cx('Input', className)} type={type ? type : 'text'} name={nameProp} aria-label={nameProp} ref={ref} {...props} />
  )
})

export function Textarea({ className, nameProp, ...props }) {
  return (
    <Form.Control as='textarea' className={cx('Textarea', className)} name={nameProp} aria-label={nameProp} {...props} />
  )
}
