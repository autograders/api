export function getURL(url: string, params?: Record<string, any>) {
  if (!params) return url;

  const encodedParams: Record<string, string> = Object.keys(params)
    .map((p) => ({
      [p]: encodeURIComponent(params[p])
    }))
    .reduce((a, b) => {
      return Object.assign(a, b);
    });

  return `${url}?${new URLSearchParams(encodedParams)}`;
}
