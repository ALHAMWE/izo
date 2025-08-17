import jwt_decode from 'jwt-decode'

export const verifyAuth = async (token, key, database) => {
  const tokenSecret      = token
  const keySecret        = key
  const databaseSecret   = database

  // const stringToken = token.toString()
  // console.log('Token received:', token.value)
  // console.log('tokenSecret.value 🤖', tokenSecret.value)

  try {
    const verification = await jwt_decode(tokenSecret.value)

    // console.log('dB', databaseSecret)
    // console.log('verification', verification)
    // console.log('verification.secret_k', typeof verification.secret_k)
    // console.log('keySecret.value', typeof keySecret.value)

    // console.log('verification.secret_k 🥶', verification.secret_k)
    // console.log('keySecret.value 👾', keySecret.value)

    if (verification.secret_k === keySecret.value) {
      if(databaseSecret.value != null){
        return true
      }else{
        return null
      }
    } else {
      return null
    }
  } catch (e) {
    // console.log('error auth verify:=>', e)

    return null
  }
}
