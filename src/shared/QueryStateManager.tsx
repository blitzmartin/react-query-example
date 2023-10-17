import type { UseQueryResult } from '@tanstack/react-query'

/* eslint-disable @typescript-eslint/no-explicit-any  */
/* eslint-disable @typescript-eslint/ban-types  */

export const isFunction = (obj: unknown): obj is Function =>
  typeof obj === 'function'

type LoadingFunction = () => React.ReactElement<any, any> | null
type SuccessFunction<Data> = (data: Data) => React.ReactElement<any, any> | null
type ErrorFunction<Error> = (
  error: Error
) => React.ReactElement<any, any> | null

type Props<Data, Error> = {
  query: UseQueryResult<Data, unknown>
  renderOnLoading?: React.ReactNode | LoadingFunction
  renderOnSuccess: React.ReactNode | SuccessFunction<Data>
  renderOnError?: React.ReactNode | ErrorFunction<Error>
}

export const QueryStateManager = <Data, Error>({
  query,
  renderOnLoading,
  renderOnError,
  renderOnSuccess,
}: Props<Data, Error>) => {
  const { status, data, error } = query

  if (status === 'loading') {
    return isFunction(renderOnLoading) ? (
      renderOnLoading()
    ) : (
      <>{renderOnLoading}</>
    )
  }

  if (status === 'error') {
    return isFunction(renderOnError) ? (
      renderOnError(error as Error)
    ) : (
      <>{renderOnError}</>
    )
  }

  return isFunction(renderOnSuccess) ? (
    renderOnSuccess(data)
  ) : (
    <>{renderOnSuccess}</>
  )
}
