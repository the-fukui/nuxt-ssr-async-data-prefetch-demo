<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">ssr-async-data-prefetch-demo</h1>
      <p>TODO: revalidate prefetched data.</p>
      <br />
      <p>
        ↓ These links are supposed to be prefetched when it turn visible.<br />
        (Because linked page's asyncData takes 1 sec, You have to wait 1 sec
        after these links turns visible or don't get the effect.)
      </p>
      <div class="links">
        <nuxt-link to="/ssr/aaaa">SSR1</nuxt-link>
      </div>
      <div class="links" style="margin-top: 100vh">
        <nuxt-link to="/ssr/bbbb">SSR2</nuxt-link>
      </div>
      <div class="links" style="margin-top: 50vh; margin-bottom: 50vh">
        <nuxt-link to="/ssr/cccc" data-no-prefetch
          >SSR3 (prefetch disabled)</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
  padding-bottom: 50px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
