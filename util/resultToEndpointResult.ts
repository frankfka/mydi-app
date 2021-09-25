import EndpointResult from '../types/EndpointResult';
import Result from '../types/Result';

export default function resultToEndpointResult<T>(
  result: Result<T>
): EndpointResult<T> {
  const errorMessage =
    result.error instanceof Error ? result.error.message : `${result.error}`;
  return {
    data: result.data,
    error: errorMessage,
  };
}
