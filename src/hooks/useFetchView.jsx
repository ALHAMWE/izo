// ** Create Custom Hook to fetching data
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie } from 'cookies-next'
import { fetchViewUser } from 'src/store/apps/izoUsers/viewUserSlice'

const useFetchView = id => {
  const [token, setToken] = useState('')
  const [url, setUrl] = useState('')
  const [database, setDatabase] = useState('')
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const dataFetch = useSelector(state => state.viewUser.data)

  useEffect(() => {
    const token     = getCookie('token')
    const url       = getCookie('apiUrl')
    const database  = getCookie('DatabaseConnection')
    setToken(token)
    setUrl(url)
    setDatabase(database)
  }, [token, url, database])

  // ** Fetch data from redux
  useEffect(() => {
    if (token && url && database && id) {
      dispatch(fetchViewUser({ token, url , database, id }))
    }
  }, [token, url, database, id, dispatch])

  useEffect(() => {
    setData(dataFetch)
  }, [dataFetch])

  return { data }
}

export default useFetchView
