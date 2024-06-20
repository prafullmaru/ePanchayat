export function getQueryParam(key): string {
  return getQueryParams().get(key);
}

export function getQueryParams(): URLSearchParams {
  const hash = window.location.hash;
  const queryParamsIndex = hash.indexOf('?');
  const queryParams =
    queryParamsIndex === -1
      ? ''
      : hash.slice(queryParamsIndex + 1, hash.length);
  return new URLSearchParams(queryParams);
}
