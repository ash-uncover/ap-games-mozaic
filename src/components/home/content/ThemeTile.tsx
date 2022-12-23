import React from 'react'

import './ThemeTile.css'

export interface ThemeTileProperties {
  name: string
  description: string
  thumbnail?: string
  background?: string
  images: string[]
  selected: boolean

  onClick: () => void
}

export const ThemeTile = ({
  name,
  description,
  thumbnail,
  background,
  images,
  selected,

  onClick,
}: ThemeTileProperties) => {

  // Events //

  const handleClick = () => {
    onClick()
  }
  // Rendering //

  const resolveThumbnail = () => {
    if (thumbnail) {
      return thumbnail
    }
    if (background) {
      return background
    }
    if (images && images.length) {
      return images[0]
    }
    return null
  }

  const classes = ['theme-tile']
  if (selected) {
    classes.push('selected')
  }

  return (
    <button
      className={classes.join(' ')}
      title={description}
      onClick={handleClick}
    >
      <img
        className='theme-tile-image'
        src={resolveThumbnail()}
      />
    </button>
  )
}