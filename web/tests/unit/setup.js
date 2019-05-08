import styles from '../../src/styles.css'
import { configure } from 'dom-testing-library'
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

// Wait for styles to load.
beforeAll(async () => {
  // TODO: Remove when React 16.9 is released.
  const error = console.error.bind(console)
  jest.spyOn(console, 'error').mockImplementation((...args) => 
    args[0].toString().includes('not wrapped in act(') || error(...args))

  await styles
})

afterAll(() => {
  // TODO: Remove when React 16.9 is released.
  console.error.mockRestore()
})

configure({
  testIdAttribute: 'data-test'
})
