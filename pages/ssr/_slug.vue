<template>
  <div>
    <p>This page is rendered at server.(It takes 1 sec)</p>
    <p>{{ serverData }} ← this data is returned from server.</p>
  </div>
</template>

<script>
export default {
  async asyncData({ $prefetched, route }) {
    if ($prefetched(route)) return $prefetched(route)

    const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec))
    await sleep(1000)

    return {
      serverData: new Date(),
    }
  },
}
</script>
