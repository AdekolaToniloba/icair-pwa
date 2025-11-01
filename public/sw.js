const CACHE_NAME = `icair-companion-v4-${new Date().toISOString().split('T')[0]}`;
const PAGES_TO_CACHE = [
  "/",
  "/schedule",
  "/speakers",
  "/map",
  "/hotels",
  "/more",
  "/travel-guide",
  "/travel-checklist",
]

const urlsToCache = [...PAGES_TO_CACHE, "/manifest.json"]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing new service worker...")
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.log("[SW] Cache add error:", err)
      })
    }),
  )
  // Force the waiting service worker to become the active service worker
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating new service worker...")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log("[SW] Deleting old cache:", name)
            return caches.delete(name)
          })
      )
    }),
  )
  // Take control of all pages immediately
  self.clients.claim()
})

// Fetch event - network first with cache fallback
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests and external domains
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return
  }

  // Network first strategy for HTML pages to always get latest content
  if (
    request.headers.get("accept")?.includes("text/html") ||
    url.pathname.endsWith("/") ||
    url.pathname.includes("/schedule") ||
    url.pathname.includes("/speakers") ||
    url.pathname.includes("/map") ||
    url.pathname.includes("/more") ||
    url.pathname.includes("/hotels")
  ) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the response
          if (response && response.status === 200) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })
          }
          return response
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(request).then((response) => {
            return response || new Response("Offline - Please check your connection", {
              status: 503,
              statusText: "Service Unavailable"
            })
          })
        }),
    )
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

  // Stale-while-revalidate for static assets (JS, CSS, images)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })
          }
          return response
        })
        .catch(() => cachedResponse)

      // Return cached version immediately, but update cache in background
      return cachedResponse || fetchPromise
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
    console.log("[SW] Sync failed:", error)
  }
}

// Listen for messages from the client
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        )
      })
    )
  }
})