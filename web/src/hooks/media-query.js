import { useState, useEffect } from 'react'
import breakpoints from '../breakpoints'

const QUERIES = Object
  .entries(breakpoints)
  .map(([name, size]) => ({ name, size: parseInt(size) }))

const getScreens = () => QUERIES.reduce(
  (screens, { size, name }) => ({
    ...screens,
    [name]: window.innerWidth >= size
  }),
  {}
) 

const useMediaQuery = () => {
  const [screens, setScreens] = useState(getScreens)
  
  useEffect(() => {
    const checkQuery = () => setScreens(getScreens())

    // Check the query when the window resizes.
    window.addEventListener('resize', checkQuery)
  
    // Remove the old handler before installing the new one.
    return () =>
      window.removeEventListener('resize', checkQuery)
  })

  return [screens]
}

export default useMediaQuery