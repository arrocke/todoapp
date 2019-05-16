import React from 'react'
import { renderWithRouter } from '../utils'
import { fireEvent, wait } from 'dom-testing-library'
import Navigation from '../../../src/components/Navigation'
import projectBuilder from '../../builders/project'
import client from '../../../src/client'
import {ProjectProvider} from '../../../src/contexts/projects'

jest.mock('../../../src/client', () => ({
  query: jest.fn().mockResolvedValue({}),
  mutate: jest.fn().mockResolvedValue({})
}))

const renderNavigation = async ({
  open = true,
  projects = new Array(8).fill().map(() => projectBuilder())
} = {}) => {
  client.query.mockResolvedValue({ data: { projects } })

  const utils = renderWithRouter(
    <ProjectProvider>
      <Navigation />
    </ProjectProvider>
  )
  
  // Open the menu if requested.
  if (open) {
    const menuButton = utils.getByTestId('menu-button')
    fireEvent.click(menuButton)

    await wait(() => utils.getByText(projects[0].name))
  }


  return { projects, ...utils }
}

it('clicking menu button opens the side menu', async () => {
  const { getByTestId } = await renderNavigation({ open: false })

  // Menu is closed.
  const overlay = getByTestId('side-menu-overlay')
  expect(overlay).toHaveClass('invisible')
  
  // Click menu button.
  const menuButton = getByTestId('menu-button')
  fireEvent.click(menuButton)

  // Menu is open.
  expect(overlay).not.toHaveClass('invisible')
})

it('clicking on screen closes the side menu', async () => {
  const { getByTestId } = await renderNavigation()

  // Click screen outside of the menu.
  const screen = getByTestId('side-menu-overlay')
  fireEvent.click(screen)

  // Menu is closed.
  const overlay = getByTestId('side-menu-overlay')
  expect(overlay).toHaveClass('invisible')
})

it('clicking on close button closes the side menu', async () => {
  const { getByTestId } = await renderNavigation()

  // Click screen outside of the menu.
  const closeButton = getByTestId('close-menu-button')
  fireEvent.click(closeButton)

  // Menu is closed.
  const overlay = getByTestId('side-menu-overlay')
  expect(overlay).toHaveClass('invisible')
})

it('clicking on the menu does not close it', async () => {
  const { getByTestId } = await renderNavigation()

  // Click screen outside of the menu.
  const menu = getByTestId('side-menu')
  fireEvent.click(menu)

  // Menu is open.
  const overlay = getByTestId('side-menu-overlay')
  expect(overlay).not.toHaveClass('invisible')
})

it('displays the list of projects in the side menu.', async () => {
  const { getAllByTestId, projects } = await renderNavigation()

  const linkNames = getAllByTestId('nav-link')
    .map(link => link.textContent)
  const projectNames = projects.map(({ name }) => name)
  expect(linkNames).toEqual(expect.arrayContaining(projectNames))
})

it('clicking on the today link navigates to the today page', async () => {
  const { getByTestId, getByText, history } = await renderNavigation()

  // Click today link.
  const link = getByText('Today')
  fireEvent.click(link)

  // Navigated and closed menu.
  const menu = getByTestId('side-menu-overlay')
  expect(menu).toHaveClass('invisible')
  expect(history.location.pathname).toEqual('/today')
})

it('clicking on a project link navigates to the page for the project', async () => {
  const { getByTestId, getByText, history, projects } = await renderNavigation()

  // Click today link.
  const link = getByText(projects[0].name)
  fireEvent.click(link)

  // Navigated and closed menu.
  const menu = getByTestId('side-menu-overlay')
  expect(menu).toHaveClass('invisible')
  expect(history.location.pathname).toEqual(`/projects/${projects[0].id}`)
})
