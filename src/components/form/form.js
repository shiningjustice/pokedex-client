import React from 'react'
import cx from 'classnames'
// import './Form.css'

export function Label({ className, ...props }) {
  return (
    <label className={cx('Label', className)} {...props} />
  )
}

export const Input =  React.forwardRef(({ className, nameProp, ...props }, ref) => {
  return (
    <input className={cx('Input', className)} type='text' name={nameProp} aria-label={nameProp} ref={ref} {...props} />
  )
})

export function Textarea({ className, nameProp, ...props }) {
  return (
    <textarea className={cx('Textarea', className)} name={nameProp} aria-label={nameProp} {...props} />
  )
}
