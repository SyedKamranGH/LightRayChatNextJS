import * as Sentry from '@sentry/nextjs'
import axios from 'axios'
import { Log } from 'debug-next'

const { log, logError } = Log()

function _getErrorCodesToCapture(captureEnv: string) {
    if (!captureEnv) return []
    const split = captureEnv.split(',')
    if (split.length === 0) return []
    const codes = new Set<number>()
    const codesToNegate = new Set<number>()

    split.forEach(item => {
        const trimmed = item.trim()

        if (trimmed.length < 1) return

        // handle ranges
        if (trimmed.indexOf('-') > -1) {
            const split = trimmed.split('-')
            const start = parseInt(split[0], 10)
            const end = parseInt(split[1], 10)

            if (Number.isNaN(start)) {
                let msg = `Start value of ${split[0]} in range of ${item} provided`
                msg += ' in SENTRY_CAPTURE_ERRORS is invalid.'
                return logError(msg)
            }

            if (Number.isNaN(end)) {
                let msg = `End value of ${split[1]} in range of ${item} provided`
                msg += ' in SENTRY_CAPTURE_ERRORS is invalid.'
                return logError(msg)
            }

            if (end <= start) {
                return logError(
                    `End value of ${end} in range ${item} cannot be smaller than start value.`,
                )
            }

            for (let i = start; i <= end; i++) {
                codes.add(i)
            }
            return
        }

        // handle values with "not" operator
        if (trimmed.indexOf('not') === 0) {
            const parsed = parseInt(trimmed.substring(3), 10)

            if (Number.isNaN(parsed)) {
                return logError(`Value of ${item} in SENTRY_CAPTURE_ERRORS is invalid.`)
            }
            return codesToNegate.add(parsed)
        }

        // handle normal values
        const parsed = parseInt(trimmed, 10)
        if (Number.isNaN(parsed))
            return logError(`Value of ${item} in SENTRY_CAPTURE_ERRORS is invalid.`)
        codes.add(parsed)
    })
    if (codesToNegate.size === 0) return Array.from(codes.values())
    return Array.from(codes.values()).filter(code => !codesToNegate.has(code))
}

function _getStatusCode(error: unknown) {
    if (typeof error !== 'object') return null

    const susError = error as { getStatus?: () => number; statusCode?: number; status?: number }

    // internally malt produces .statusCode property
    if (susError.statusCode) return susError.statusCode

    // NestJS exceptions have getStatus function
    if (typeof susError.getStatus === 'function') return susError.getStatus()

    // some modules produce .status property
    if (susError.status) return susError.status

    if (axios.isAxiosError(error)) return error.response?.status

    return null
}

function _shouldHandleError(error: unknown) {
    log('Sentry handling error.')

    const CAPTURE_ERRORS = process.env.NEXT_PUBLIC_SENTRY_CAPTURE_ERRORS

    if (CAPTURE_ERRORS === 'NONE') return false
    if (process.env.NODE_ENV === 'test') return false

    // sentry handles only >=500 errors by default
    // See https://docs.sentry.io/platforms/node/guides/express/

    // let's capture per .env
    const statusCode = _getStatusCode(error)

    if (!statusCode) {
        log("capture any errors that doesn't have a status code")
        return true
    }

    if (CAPTURE_ERRORS === 'ALL') return true

    // process the env strings to figure out what errors to capture
    const errorsToCapture = CAPTURE_ERRORS ? _getErrorCodesToCapture(CAPTURE_ERRORS) : []

    if (errorsToCapture.indexOf(statusCode as number) > -1) return true

    // this hard overwrites any negation defined in the env
    if (statusCode >= 500) {
        log('Capturing errors with no statusCode or >= 500')
        return true
    }

    return false
}

const sentryErrorHandler = (error: unknown) => {
    if (_shouldHandleError(error)) Sentry.captureException(error)
}

export { sentryErrorHandler, _getErrorCodesToCapture, _getStatusCode, _shouldHandleError }
