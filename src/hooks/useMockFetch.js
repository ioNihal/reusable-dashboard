
import { useState, useEffect } from 'react'
import { fetchMock } from '../services/api'

export default function useMockFetch(data, delay = 400) {
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchMock(data, delay).then((res) => {
      if (!mounted) return
      setResult(res)
      setLoading(false)
    })
    return () => { mounted = false }
  }, [data, delay])

  return { data: result, loading }
}
