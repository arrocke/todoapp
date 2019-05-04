import React from 'react'
import { shallow } from 'enzyme'
import Navigation from '../../../src/components/Navigation'

describe('Navigation', () => {
  test('side menu is initially closed.', () => {
    const wrapper = shallow(
      <Navigation />
    )

    const menu = wrapper.find('[data-test="side-menu"]')
    expect(menu.hasClass('invisible')).toBe(true)
  })

  test('opens side menu when the menu button is clicked.', () => {
    const wrapper = shallow(
      <Navigation />
    )
    
    // Open menu
    const button = wrapper.find('[data-test="menu-button"]')
    button.simulate('click')

    const menu = wrapper.find('[data-test="side-menu"]')
    expect(menu.hasClass('invisible')).toBe(false)
  })

  test('closes side menu when the screen is clicked.', () => {
    const wrapper = shallow(
      <Navigation />
    )
    
    // Open menu
    const button = wrapper.find('[data-test="menu-button"]')
    button.simulate('click')

    // Close menu
    const overlay = wrapper.find('[data-test="side-menu"]')
    overlay.simulate('click')

    const menu = wrapper.find('[data-test="side-menu"]')
    expect(menu.hasClass('invisible')).toBe(true)
  })

  test('closes side menu when the close button is clicked.', () => {
    const wrapper = shallow(
      <Navigation />
    )

    // Open menu
    const button = wrapper.find('[data-test="menu-button"]')
    button.simulate('click')

    // Close menu
    const closeButton = wrapper.find('[data-test="close-menu-button"]')
    closeButton.simulate('click')

    const menu = wrapper.find('[data-test="side-menu"]')
    expect(menu.hasClass('invisible')).toBe(true)
  })
})