import { GridContainer } from '@uncover/games-common'
import React, { ReactNode } from 'react'

import './GridTiles.css'

export interface GridTilesProperties {
  className?: string
  height: number
  width: number

  children: ReactNode
}

export const GridTiles = ({
  className,
  height,
  width,

  children,
}: GridTilesProperties) => {


  // Rendering //

  const maxChildren = height * width

  const renderChildren = () => {
    if (Array.isArray(children)) {
      const result = []
      for (let i = 0; i < maxChildren && i < children.length ; i++) {
        result.push(renderChild(children[i], i + 1))
      }
      return result
    }
    return renderChild(children)
  }

  const renderChild = (element: ReactNode, index?: number) => {
    return (
      <div
        className='grid-tiles-item'
        key={index ? `tile-${index}` : undefined}
        style={{
          width: `${100 / width}%`
        }}
      >
        {element}
      </div>
    )
  }

  const classes = ['grid-tiles']
  if (className) {
    classes.push(className)
  }

  return (
    <GridContainer
      className={classes.join(' ')}
      height={height}
      width={width}
    >
      {renderChildren()}
    </GridContainer>
  )
}