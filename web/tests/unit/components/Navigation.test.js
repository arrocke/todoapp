import React from 'react'
import { renderWithRouter } from '../utils'
import { fireEvent } from 'dom-testing-library'
import Navigation from '../../../src/components/Navigation'

it('clicking menu button opens the side menu', () => {
  const { getByTestId } = renderWithRouter(<Navigation />)

  // Menu is closed.
  const overlay = getByTestId('side-menu-overlay')
  expect(overlay).toHaveClass('invisible')
  
  // Click menu button.
  const menuButton = getByTestId('menu-button')
  fireEvent.click(menuButton)

  // Menu is open.
  expect(overlay).not.toHaveClass('invisible')
})

it('clicking on screen closes the side menu', () => {
  const { getByTestId } = renderWithRouter(<Navigation />)

  // Open menu.
  const menuButton = getByTestId('menu-button')
  fireEvent.click(menuButton)

  // Click screen outside of the menu.
  const screen = getByTestId('side-menu-overlay')
  fireEvent.click(screen)

  // Menu is closed.
  const overlay = getByTestId('side-menu-overlay')
  expect(overlay).toHaveClass('invisible')
})

it('clicking on close button closes the side menu', () => {
  const { getByTestId } = renderWithRouter(<Navigation />)

  // Open menu.
  const menuButton = getByTestId('menu-button')
  fireEvent.click(menuButton)

  // Click screen outside of the menu.
  const closeButton = getByTestId('close-menu-button')
  fireEvent.click(closeButton)

  // Menu is closed.
  const overlay = getByTestId('side-menu-overlay')
  expect(overlay).toHaveClass('invisible')
})

it('clicking on the menu does not close it', () => {
  const { getByTestId } = renderWithRouter(<Navigation />)

  // Open menu.
  const menuButton = getByTestId('menu-button')
  fireEvent.click(menuButton)

  // Click screen outside of the menu.
  const menu = getByTestId('side-menu')
  fireEvent.click(menu)

  // Menu is open.
  const overlay = getByTestId('side-menu-overlay')
  expect(overlay).not.toHaveClass('invisible')
})

it('clicking on the today link navigates to the today page', () => {
  const { getByTestId, getByText, history } = renderWithRouter(<Navigation />)

  // Open menu.
  const menuButton = getByTestId('menu-button')
  fireEvent.click(menuButton)

  // Click today link.
  const link = getByText('Today')
  fireEvent.click(link)

  // Navigated and closed menu.
  const menu = getByTestId('side-menu-overlay')
  expect(menu).toHaveClass('invisible')
  expect(history.location.pathname).toEqual('/today')
})
