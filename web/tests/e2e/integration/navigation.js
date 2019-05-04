describe('navigation', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  const clickMenuButton = () => {
    cy.get('[data-test=menu-button]')
      .click()
  }

  it('clicking on the menu button opens the menu', () => {
    clickMenuButton()

    cy.get('[data-test=side-menu')
      .should('be.visible')
  })

  it('clicking the close button should close the menu', () => {
    clickMenuButton()

    cy.get('[data-test=close-menu-button]')
      .click()

    cy.get('[data-test=side-menu]')
      .should('not.be.visible')
  })

  it('clicking the Today link should navigate the correct page', () => {
    clickMenuButton()

    cy.get('[data-test=today-link]')
      .click()

    cy.url()
      .should('equal', `${Cypress.config().baseUrl}/today`)

    cy.get('[data-test=side-menu')
      .should('not.be.visible')
  })
})