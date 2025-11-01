const CACHE_NAME = "icair-conf-v1"
const urlsToCache = ["/", "/manifest.json", "/offline.html"]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.log("[v0] Cache add error:", err)
      })
    }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)))
    }),
  )
  self.clients.claim()
})

// Fetch event - network first, fallback to cache
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and external domains
  if (request.method !== "GET" || !url.origin.includes(self.location.origin)) {
    return
  }

  // Network first for API calls
  if (url.pathname.includes("/api/")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response && response.status === 200) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })
          }
          return response
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            return response || new Response("Offline", { status: 503 })
          })
        }),
    )
    return
  }

  // Cache first for static assets
  event.respondWith(
    caches
      .match(request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type === "error") {
            return response
          }
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache)
          })
          return response
        })
      })
      .catch(() => {
        return new Response("Offline", { status: 503 })
      }),
  )
})

// Background sync for queued actions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-schedule") {
    event.waitUntil(syncScheduleData())
  }
})

async function syncScheduleData() {
  try {
    const response = await fetch("/api/sync")
    return response.json()
  } catch (error) {
    console.log("[v0] Sync failed:", error)
  }
}
