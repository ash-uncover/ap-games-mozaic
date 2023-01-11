import React from 'react'

import './Loader.css'

interface LoaderProperties {
  text?: string
  value: number
}

export const Loader = ({
  text,
  value,
}: LoaderProperties) => {

  // Rendering //

  const classes = ['loader']

  return (
    <div
      className={classes.join(' ')}
    >
      <div
        className='loader__content'
      >
        <div
          className='loader__text'
        >
          {text}
        </div>

        <div
          className='loader__bar'
        >
          <div
            className='loader__bar-inner'
            style={{
              width: `${Math.min(100, Math.max(0, value))}%`
            }}
          />
          <div
            className='loader__bar-value'
          >
            {value}%
          </div>
        </div>
      </div>
    </div>
  )
}