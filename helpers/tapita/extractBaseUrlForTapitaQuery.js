export const extractBaseUrlForTapitaQuery = (url) => {
  if (!url) {
    return '/'
  }
  const normalizedURL = url[0] === '/' ? url.slice(1,) : url

  const splittedComponents = normalizedURL.split('/')

  if (splittedComponents.length > 0 && splittedComponents[0] !== 'default') {
    return url
  }

  if (splittedComponents.length >= 2) {
    return '/' + splittedComponents[splittedComponents.length - 1]
  } else {
    return '/'
  }
}
