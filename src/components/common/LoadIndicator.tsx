import React, { CSSProperties } from 'react'
// Styles
import './LoadIndicator.css'

interface LoadIndicatorProperties {
  className?: string
  style?: CSSProperties
}

export const LoadIndicator = ({
  className,
  style,
}: LoadIndicatorProperties) => {

  // Rendering //

  const classes = ['load-indicator']
  if (className) {
    classes.push(className)
  }

  return (
    <div
      className={classes.join(' ')}
      style={style}
    >
      <LoadIndicatorElement className='element--1' />
      <LoadIndicatorElement className='element--2' />
      <LoadIndicatorElement className='element--3' />
    </div>
  )
}

interface LoadIndicatorElementProperties {
  className?: string
}

const LoadIndicatorElement = ({
  className
}: LoadIndicatorElementProperties) => {

  // Rendering //

  const classes = ['load-indicator-element']
  if (className) {
    classes.push(className)
  }

  return (
    <div className={classes.join(' ')}>
      <div className='load-indicator-element__inner' />
    </div>
  )
}