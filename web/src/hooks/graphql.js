import { useEffect, useReducer } from 'react'
import client from '../client'

const reducer = (state, { type, data, error }) => {
  switch(type) {
    case 'start':
      return {
        ...state,
        loading: true,
        error: null
      }
    case 'end':
      return {
        data,
        loading: false,
        error: null
      }
    case 'error':
      return {
        ...state,
        error,
        loading: false,
      }
    case 'cancelled':
      return {
        ...state,
        loading: false
      }
    default:
      throw new Error()
  }
}

const useGraphql = ({ query, mutation, variables }) => {
  const initialData = {
    loading: false,
    error: null,
    data: {}
  }
  const [{ data, loading, error }, dispatch] = useReducer(reducer, initialData)

  useEffect(() => {
    let cancelled = false
    let data

    const load = async () => {
      try {
        dispatch({ type: 'start' })

        // Dispatch query or mutation.
        if (mutation) {
          const res = await client.mutate({ mutation, variables })
          data = res.data
        } else {
          const res = await client.query({ query, variables })
          data = res.data
        }

        // Update state if not cancelled.
        if (cancelled) {
          dispatch({ type: 'cancelled' })
        } else {
          dispatch({ data, type: 'end' })
        }
      } catch (error) {
        dispatch({ error, type: 'error' })
      }
    }
    load()

    // Cancel effect on next load.
    return () => { cancelled = true }
  }, [ query, mutation, variables ])

  return [data, loading, error]
}

export default useGraphql