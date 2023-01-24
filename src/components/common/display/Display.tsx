import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import DisplaySelectors from 'store/display/display.selectors'

interface DisplayProperties {
  className?: string
  children: ReactNode
}

export const Display = ({
  className,
  children,
}: DisplayProperties) => {

  // Hooks //

  const brightness = useSelector(DisplaySelectors.brightness)
  const contrast = useSelector(DisplaySelectors.contrast)

  // Rendering //

  const classes = ['']
  if (className) {
    classes.push(className)
  }

  const filter = `brightness(${brightness / 100}) contrast(${contrast / 100})`

  return (
    <div
      className={classes.join(' ')}
      style={{
        filter
      }}
    >
      {children}
    </div>
  )
}