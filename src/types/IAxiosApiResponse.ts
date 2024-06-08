import { Snag } from 'snag'
import { AxiosError, AxiosResponse } from 'axios'

export interface IApiResponseBaseData {
    success: boolean
    statusCode: number
}

export type TApiErrorData = ReturnType<InstanceType<typeof Snag>['toJSON']>

export interface IApiSuccessData<T> extends IApiResponseBaseData {
    result: T
}

export type IApiResponse<T> = AxiosResponse<IApiSuccessData<T>>

export type IApiErrorResponse = AxiosError<TApiErrorData>
