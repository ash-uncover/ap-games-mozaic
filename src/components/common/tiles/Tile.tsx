import React from 'react'
// Style
import './Tile.css'

export interface TileProperties {
  className?: string
  name: string
  title: string
  image: string

  onClick: () => void
}

export const Tile = ({
  className,
  name,
  title,
  image,

  onClick,
}: TileProperties) => {

  // Events //

  const handleClick = () => {
    onClick()
  }
  // Rendering //

  const classes = ['tile']
  if (className) {
    classes.push(className)
  }

  return (
    <button
      className={classes.join(' ')}
      title={title}
      onClick={handleClick}
    >
      <img
        className='tile__image'
        src={image}
      />
    </button>
  )
}