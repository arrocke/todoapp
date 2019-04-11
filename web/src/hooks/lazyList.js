import { useState, useEffect } from 'react'

// Loads a list of elements a page at a time.
// params:
//    fetchPage: function that takes a page number,
//      and returns a promise resolving to { page, hasNext }
// returns:
//    collection: the current list of items loaded.
//    setCollection: manually set the collection.
//    loading: whether more pages are being loaded.
const useLazyList = ({ fetchPage }) => {
  const [pageNumber, setPageNumber] = useState(0)
  const [loading, setLoading] = useState(true)
  const [collection, setCollection] = useState([])

  // Load a page at a time.
  useEffect(() => {
    const effect = async () => {
      const { page, hasNext } = await fetchPage(pageNumber)
      setCollection(collection => [...collection, ...page])

      // Load next page if there are more, otherwise stop loading.
      if (hasNext) {
        setPageNumber(pageNumber + 1)
      } else {
        setLoading(false)
      }
    }
    effect()
  }, [pageNumber, fetchPage])
  
  return [collection, setCollection, loading]
}

export default useLazyList