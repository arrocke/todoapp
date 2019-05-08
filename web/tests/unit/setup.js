import styles from '../../src/styles.css'
import { configure } from 'dom-testing-library'
import 'jest-dom/extend-expect'

// Wait for styles to load.
beforeAll(async () => {
  await styles
})

configure({
  testIdAttribute: 'data-test'
})
