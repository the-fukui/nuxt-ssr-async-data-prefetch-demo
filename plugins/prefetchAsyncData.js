export default (context, inject) => {
  if (typeof window === 'undefined') {
    inject('prefetched', () => false)
    return
  }

  inject('prefetchedAsyncData', {})
  inject('prefetched', (route) => {
    return context.$prefetchedAsyncData[route.path]
      ? context.$prefetchedAsyncData[route.path]
      : false
  })

  const siteUrl =
    location.protocol +
    '//' +
    location.hostname +
    (location.port ? ':' + location.port : '')

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: [0],
  }

  //idea, logic from nuxt-payload-extractor (https://github.com/DreaMinder/nuxt-payload-extractor/blob/master/lib/module.js)
  const payloadKey = '__NUXT__'
  const extractPayload = (html) => {
    const chunks = html.split(`<script>window.${payloadKey}=`)
    let payload = chunks[1].split('</script>').shift()
    payload = payload.slice(-1) === ';' ? payload.slice(0, -1) : payload

    try {
      // eslint-disable-next-line no-eval
      return eval('(' + payload + ')')
    } catch (e) {
      console.log(e)
      return false
    }
  }

  const callback = (entries, object) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return

      const a = entry.target

      // if external link, do nothing
      if (!a.href || !a.href.startsWith(siteUrl)) return

      // if it should not be prefetched
      if (a.hasAttribute('data-no-prefetch')) return

      const path = a.href.replace(siteUrl, '')

      // if already prefetched
      if (context.$prefetchedAsyncData[path]) {
        a.textContent += ' (prefetched!)'
        return
      }

      fetch(path)
        .then((res) => res.text())
        .then((page) => {
          const payload = extractPayload(page)
          console.log('prefetched', path, payload)
          a.textContent += ' (prefetched!)'
          context.$prefetchedAsyncData[payload.routePath] = payload.data[0]
        })
        .catch((e) => console.log(e))

      object.unobserve(entry.target)
    })
  }

  const observer = new IntersectionObserver(callback, options)
  const observeAtags = () => {
    const targets = document.querySelectorAll('a')
    targets.forEach((target) => observer.observe(target))
  }

  observeAtags()

  // when history back, observe again
  window.onpopstate = (ev) => {
    // because querySelectorAll returns empty when just after popstate event 🤔
    setTimeout(() => {
      observeAtags()
    }, 50)
  }
}
