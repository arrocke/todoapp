import enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'dom-testing-library'
import 'jest-dom/extend-expect'

enzyme.configure({ adapter: new Adapter() })

configure({
  testIdAttribute: 'data-test'
})
