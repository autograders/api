export function getEncodedURL(url: string, params?: Record<string, any>) {
  if (!params) return url;
  const encodedParams = new URLSearchParams(params).toString();
  return `${url}?${encodedParams}`;
}
