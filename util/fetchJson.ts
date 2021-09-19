/**
 * Simple wrapper around `fetch` that returns json as an object
 * @param input
 * @param init
 */
export default async function fetchJson<TData>(
  input: RequestInfo,
  init?: RequestInit
): Promise<TData> {
  const response = await fetch(input, init);
  return response.json();
}
