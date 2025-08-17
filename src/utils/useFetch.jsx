// ** Create Custom Hook to fetching data
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import { fetchDataAnalytics } from 'src/store/apps/dashboard/dashboardSlice.js'

const useFetch = typeofData => {
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [database, setDatabase] = useState('')
  const [dataAnalytics, setDataAnalytics] = useState(null)
  const dispatch = useDispatch()
  const data = useSelector(state => state.dashboardAnalytics.data)

  useEffect(() => {
    const token = getCookie('token')
    const url   = getCookie('apiUrl')
    const database   = getCookie('DatabaseConnection')
    setToken(token)
    setUrl(url)
    setDatabase(database)
  }, [token, url, database])

  // ** Fetch data from redux
  useEffect(() => {
    if (token && url) {
      dispatch(fetchDataAnalytics({ token, url, database, typeofData }))
    }
  }, [token, url, database, typeofData, dispatch])

  useEffect(() => {
    setDataAnalytics(data)
  }, [data])

  return { dataAnalytics }
}

export default useFetch
