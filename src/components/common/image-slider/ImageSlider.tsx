import React, { useState, TouchEvent, CSSProperties } from 'react'
// Libs
// Components

import './ImageSlider.css'

const ANIMATE = {
  PREVIOUS_BEFORE: 'animate-previous-before',
  PREVIOUS_AFTER: 'animate-previous-after',
  NEXT_BEFORE: 'animate-next-before',
  NEXT_AFTER: 'animate-next-after',
}

const dragInfo = {
  target: null,
  x: -1,
}
const DRAG_THRESHOLD = 0.25

interface ImageSliderProperties {
  image: string

  onChangePrevious: () => void
  onChangeNext: () => void
}

const ImageSlider = ({
  image,

  onChangePrevious,
  onChangeNext,
}: ImageSliderProperties) => {

  // Hooks //

  const [animationMode, setAnimationMode] = useState(null)
  const [offsetX, setOffsetX] = useState(0)

  // Events //

  const handleTouchStart = (event: TouchEvent) => {
    event.preventDefault()
    if (!animationMode) {
      dragInfo.x = event.touches[0].clientX
      dragInfo.target = event.touches[0].target
      startDrag()
    }
  }

  const startDrag = () => {
    document.addEventListener('touchend', stopDrag)
    document.addEventListener('touchcancel', stopDrag)
    document.addEventListener('touchmove', doDrag)
  }

  const doDrag = (event) => {
    event.preventDefault()
    let offset = (event.touches[0].clientX - dragInfo.x) / dragInfo.target.offsetWidth
    offset = Math.max(-1, Math.min(1, offset))
    setOffsetX(offset)
  }

  const stopDrag = (event) => {
    let finalOffset = 0
    finalOffset = (event.changedTouches[0].clientX - dragInfo.x) / dragInfo.target.offsetWidth
    finalOffset = Math.max(-1, Math.min(1, finalOffset))
    document.removeEventListener('touchend', stopDrag)
    document.removeEventListener('touchcancel', stopDrag)
    document.removeEventListener('touchmove', doDrag)
    dragInfo.x = -1
    if (finalOffset >= DRAG_THRESHOLD) {
      setAnimationMode(ANIMATE.PREVIOUS_BEFORE)
    } else if (finalOffset <= -DRAG_THRESHOLD) {
      setAnimationMode(ANIMATE.NEXT_BEFORE)
    }
    setOffsetX(0)
  }

  const handleTransitionEnd = () => {
    switch (animationMode) {
      case ANIMATE.PREVIOUS_BEFORE: {
        setAnimationMode(ANIMATE.PREVIOUS_AFTER)
        onChangePrevious()
        break
      }
      case ANIMATE.PREVIOUS_AFTER: {
        setAnimationMode(null)
        break
      }
      case ANIMATE.NEXT_BEFORE: {
        setAnimationMode(ANIMATE.NEXT_AFTER)
        onChangeNext()
        break
      }
      case ANIMATE.NEXT_AFTER: {
        setAnimationMode(null)
        break
      }
    }
  }

  // Rendering //

  const classes = ['image-slider']
  if (animationMode) {
    classes.push(animationMode)
  }

  const style: CSSProperties = {}
  if (offsetX) {
    style.transition = 'none',
    style.transform = `translateX(${offsetX * 100}%)`
  }

  return (
    <div
      className={classes.join(' ')}
    >
      <img
        className='image-slider__image'
        style={style}
        src={image}
        onTouchStart={handleTouchStart}
        onTransitionEnd={handleTransitionEnd}
      />
    </div>
  )
}

export default ImageSlider