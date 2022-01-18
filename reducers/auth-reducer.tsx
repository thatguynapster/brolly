import Cookie from 'js-cookie'
import { IAuthState, IAuthAction, IAuthPayload } from '../types'

const authReducer = (state: IAuthState, action: IAuthAction) => {
  // console.log(state)
  switch (action.type) {
    case 'LOGIN':
      // console.log("login here")
      // console.log(action.payload)
      let authenticated
      let userData = ''
      /**Authentication requests done here */
      try {
        Cookie.set('loggedIn', 'true', { expires: 1, sameSite: 'lax' })
        userData = JSON.stringify(action.payload)
        // console.log(action.payload)
        Cookie.set('client', userData, { expires: 1, sameSite: 'lax' })
        sessionStorage.setItem('client', userData)

        //check rememberMe
        if (action.payload?.rememberMe) {
          const encodedUserData = btoa(userData)
          localStorage.setItem('client', encodedUserData)
        }
        // console.log('Cookies set')
        authenticated = true
      } catch (error) {
        // console.log(error)
        authenticated = false
        userData = ''
      }

      /** Always return state */
      return {
        ...state,
        isLoggedIn: authenticated,
        token: action?.payload && action.payload.token,
        data: JSON.parse(userData).data,
        business: action?.payload?.business,
        selected_business: action?.payload?.selected_business,
        selected_business_contact: action?.payload?.selected_business_contact,
        apiKey: action?.payload?.apiKey,
        appKey: action?.payload?.appKey
      }

    case 'REFRESH':
      // console.log(action.payload)

      sessionStorage.setItem('client', JSON.stringify(action.payload))
      Cookie.set('client', JSON.stringify(action.payload), { expires: 1, sameSite: 'lax' })

      /** Always return state */
      return {
        ...state,
        isLoggedIn: action?.payload?.isLoggedIn,
        token: action?.payload?.token,
        data: action?.payload?.data,
        business: action?.payload?.business,
        selected_business: action?.payload?.selected_business,
        selected_business_contact: action?.payload?.selected_business_contact,
        apiKey: action?.payload?.apiKey,
        appKey: action?.payload?.appKey
      }

    case 'LOGOUT':
      // console.log('loggin out...')
      /** Destroy all cookies or storage */
      Cookie.remove('loggedIn', { sameSite: 'lax' })
      Cookie.remove('user', { sameSite: 'lax' })
      Cookie.remove('client', { sameSite: 'lax' })

      sessionStorage.removeItem('loggedIn')
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('client')

      //set login to false and save into localStorage
      let user = localStorage.getItem('client')
      if (user) {
        let decodedUserData: IAuthPayload = JSON.parse(atob(user as string))
        decodedUserData = { ...decodedUserData, isLoggedIn: false }
        let encodedUserData = btoa(JSON.stringify(decodedUserData))
        localStorage.setItem('client', encodedUserData)
      }

      return {
        ...state,
        isLoggedIn: false,
        token: '',
        data: null,
        business: null,
        selected_business: null,
        selected_business_contact: null,
        appKey: null,
        apiKey: null
      }
    default:
      /** Always return state */
      return state
  }
}

export default authReducer