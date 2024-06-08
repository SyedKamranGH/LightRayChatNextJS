import axios from 'axios'
import router from 'next/router'

import { Log } from 'debug-next'
import { Agent } from 'http'
import { toast } from 'react-toastify'

import { useAuthStore } from '@/store/auth-store'
import { IApiErrorResponse } from '@/types/IAxiosApiResponse'
import { sentryErrorHandler } from './sentry'

const { log, logFatal, logVerbose, logError } = Log()

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
    baseURL: apiUrl,
    httpAgent: new Agent({ keepAlive: true }),
    timeout: 200_000,
})

// add a request interceptor to populate the access token in the headers
axiosInstance.interceptors.request.use(config => {
    // query the access token from the Zustand store
    const { accessToken } = useAuthStore.getState()

    // add the access token to the request headers
    config.headers['Authorization'] = `Bearer ${accessToken}`

    return config
})

axiosInstance.interceptors.response.use(
    // If the request was made successfully, just return the response
    response => response,
    errorHandler,
)

function errorHandler(err: unknown) {
    if (typeof err !== 'object' || err === null || !axios.isAxiosError(err)) {
        log('if error is not AxiosError, throw')
        logError(err)
        throw new Error('Something went wrong, please try again.')
    }

    sentryErrorHandler(err)

    const axiosError = err as IApiErrorResponse
    const { response } = axiosError

    if (typeof response !== 'object' || response === null) {
        log('if response object is not valid, throw')
        logError({ ...axiosError })
        throw new Error('Something went wrong, please try again.')
    }

    logVerbose('Response data', response.data)
    // look for the `data` property, which contains the good stuff for use to do error handling
    const { statusCode, showMessageToClient, message } = response.data

    // for 401, emit the event to log out the user
    // show a toast message
    // and return without throwing any error.
    if (statusCode === 401) {
        useAuthStore.getState().clearAuth()
        router.push('/login')

        toast.error('Login session has expired. Please re-login.', {
            autoClose: 5000,
        })

        // TODO: not returning and allowing error to throw will cause Unhandled promise rejection
        // but returning will break our query typings because return can be of type undefined
        // return
    }

    if (statusCode === 500) logFatal(response.data)

    if (showMessageToClient) throw new Error(message)

    // IMPORTANT: We need to throw the error again so it can be caught in the calling function or react-query.
    throw new Error('Something went wrong, please try again.')
}

export default axiosInstance
