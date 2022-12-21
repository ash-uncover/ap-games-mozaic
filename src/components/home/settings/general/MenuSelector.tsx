import React from 'react'
// Components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './MenuSelector.css'

export interface MenuSelectorProperties {
  value: string
  values: MenuSelectorValue[]

  onChange: (value: string) => void
}

export interface MenuSelectorValue {
  id: string
  text: string
}

export const MenuSelector = ({
  value,
  values,

  onChange,
}: MenuSelectorProperties) => {

  // Hooks //

  // Events //

  const handleValuePrevious = () => {
    const currentValueIndex: number = values.findIndex(v => v.id === value)
    const newValueIndex = (currentValueIndex + values.length - 1) % values.length
    const newValue = values[newValueIndex]
    onChange(newValue.id)
  }

  const handleValueNext = () => {
    const currentValueIndex: number = values.findIndex(v => v.id === value)
    const newValueIndex = (currentValueIndex + values.length + 1) % values.length
    const newValue = values[newValueIndex]
    onChange(newValue.id)
  }


  // Rendering //

  return (
    <div className='menu-selector'>
      <div className='menu-selector__container'>
        <button
          className='menu-selector__button'
          onClick={handleValuePrevious}
        >
          <FontAwesomeIcon icon={['fas', 'chevron-left']} />
        </button>
        <div
          className='menu-selector__value'
        >
          {values.find(v => v.id === value).text}
        </div>
        <button
          className='menu-selector__button'
          onClick={handleValueNext}
        >
          <FontAwesomeIcon icon={['fas', 'chevron-right']} />
        </button>
      </div>
    </div>
  )
}