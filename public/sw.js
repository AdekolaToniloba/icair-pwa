const CACHE_NAME = `icair-companion-v6-${new Date().toISOString().split('T')[0]}`

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
      console.log("[SW] Caching app shell and pages...")
      return Promise.allSettled(
        urlsToCache.map(url =>
          cache.add(url).catch(err => {
            console.warn(`[SW] Failed to cache ${url}:`, err)
            return null
          })
        )
      ).then(() => {
        console.log("[SW] Install complete")
      })
    })
  )
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
    }).then(() => {
      console.log("[SW] Activation complete")
    })
  )
  return self.clients.claim()
})

// Fetch event - handle all network requests
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return
  }

  // Handle Next.js chunks and build files
  if (
    url.pathname.includes("/_next/static/") ||
    url.pathname.includes("/_next/data/") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".json")
  ) {
    event.respondWith(handleNextAsset(request))
    return
  }

  // Handle images and media
  if (
    url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$/)
  ) {
    event.respondWith(handleStaticAsset(request))
    return
  }

  // Handle navigation (HTML pages)
  if (
    request.mode === "navigate" ||
    request.headers.get("accept")?.includes("text/html")
  ) {
    event.respondWith(handleNavigation(request))
    return
  }

  // Handle API calls
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(handleApiRequest(request))
    return
  }

  // Default: cache-first with network fallback
  event.respondWith(
    caches.match(request).then(response => {
      return response || fetch(request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const cache = caches.open(CACHE_NAME)
          cache.then(c => c.put(request, networkResponse.clone()))
        }
        return networkResponse
      })
    })
  )
})

// Handle Next.js assets (chunks, build files)
async function handleNextAsset(request) {
  try {
    // Try cache first for better performance
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      console.log("[SW] Serving Next.js asset from cache:", request.url)

      // Update cache in background
      fetch(request).then(response => {
        if (response && response.status === 200) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, response.clone())
          })
        }
      }).catch(() => { })

      return cachedResponse
    }

    // Not in cache, fetch from network
    console.log("[SW] Fetching Next.js asset from network:", request.url)
    const networkResponse = await fetch(request)

    // Cache successful responses
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
      console.log("[SW] Cached Next.js asset:", request.url)
    }

    return networkResponse
  } catch (error) {
    console.error("[SW] Failed to fetch Next.js asset:", request.url, error)

    // Try one more time from cache
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      console.log("[SW] Serving stale Next.js asset from cache:", request.url)
      return cachedResponse
    }

    // If it's a chunk file, return a minimal response to prevent errors
    if (request.url.includes("/_next/static/chunks/")) {
      console.log("[SW] Returning empty module for missing chunk")
      return new Response("export default {};", {
        status: 200,
        headers: {
          "Content-Type": "application/javascript",
          "Cache-Control": "no-cache"
        }
      })
    }

    throw error
  }
}

// Handle navigation requests
async function handleNavigation(request) {
  const url = new URL(request.url)

  try {
    console.log("[SW] Fetching navigation:", url.pathname)
    const networkResponse = await fetch(request)

    // Cache the response
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    console.log("[SW] Network failed for navigation:", url.pathname)

    // Try exact URL from cache
    let cachedResponse = await caches.match(request)

    // Try without query params
    if (!cachedResponse) {
      const urlWithoutQuery = url.origin + url.pathname
      cachedResponse = await caches.match(urlWithoutQuery)
    }

    // Try with trailing slash
    if (!cachedResponse && !url.pathname.endsWith("/")) {
      cachedResponse = await caches.match(url.pathname + "/")
    }

    // Try without trailing slash
    if (!cachedResponse && url.pathname.endsWith("/") && url.pathname !== "/") {
      cachedResponse = await caches.match(url.pathname.slice(0, -1))
    }

    if (cachedResponse) {
      console.log("[SW] Serving from cache:", url.pathname)
      return cachedResponse
    }

    // Last resort: try to serve the homepage
    console.log("[SW] Serving homepage as fallback")
    const homeResponse = await caches.match("/")
    if (homeResponse) {
      return homeResponse
    }

    // No cache available
    return createOfflineResponse()
  }
}

// Handle static assets (images, fonts, etc.)
async function handleStaticAsset(request) {
  // Cache-first strategy
  const cachedResponse = await caches.match(request)

  if (cachedResponse) {
    // Update cache in background
    fetch(request).then(response => {
      if (response && response.status === 200) {
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, response.clone())
        })
      }
    }).catch(() => { })

    return cachedResponse
  }

  // Not in cache, fetch from network
  try {
    const networkResponse = await fetch(request)

    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    // Return placeholder or error
    return new Response("", { status: 404 })
  }
}

// Handle API requests
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    return new Response(
      JSON.stringify({ error: "Offline - data not available" }),
      {
        status: 503,
        statusText: "Service Unavailable",
        headers: { "Content-Type": "application/json" }
      }
    )
  }
}

// Create offline response
function createOfflineResponse() {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline - ICAIR 2025</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            background: linear-gradient(135deg, #00A651 0%, #00A651 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            color: white;
          }
          .container {
            text-align: center;
            max-width: 400px;
          }
          .icon {
            width: 80px;
            height: 80px;
            margin: 0 auto 2rem;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
          }
          h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            font-weight: 700;
          }
          p {
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 2rem;
            opacity: 0.9;
          }
          .cached-pages {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 1.5rem;
            margin-top: 2rem;
          }
          .cached-pages h2 {
            font-size: 1rem;
            margin-bottom: 1rem;
            opacity: 0.9;
          }
          .page-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .page-link {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.75rem 1rem;
            border-radius: 8px;
            text-decoration: none;
            color: white;
            transition: background 0.2s;
            display: block;
          }
          .page-link:hover {
            background: rgba(255, 255, 255, 0.3);
          }
          .retry-button {
            background: white;
            color: #00A651;
            border: none;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
          }
          .retry-button:hover {
            transform: scale(1.05);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">📡</div>
          <h1>You're Offline</h1>
          <p>This page hasn't been fully loaded yet. Please check your internet connection and try again.</p>
          
          <button class="retry-button" onclick="window.location.reload()">
            Try Again
          </button>
          
          <div class="cached-pages">
            <h2>Available Offline Pages:</h2>
            <div class="page-list">
              <a href="/" class="page-link">🏠 Home</a>
              <a href="/schedule" class="page-link">📅 Schedule</a>
              <a href="/speakers" class="page-link">🎤 Speakers</a>
              <a href="/map" class="page-link">🗺️ Map</a>
              <a href="/hotels" class="page-link">🏨 Hotels</a>
              <a href="/more" class="page-link">⋯ More</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
      "Cache-Control": "no-cache"
    }
  })
}

// Background sync
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

// Message handler
self.addEventListener("message", (event) => {
  console.log("[SW] Received message:", event.data)

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting()
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => caches.delete(name))
        )
      }).then(() => {
        console.log("[SW] All caches cleared")
      })
    )
  }

  if (event.data && event.data.type === "CACHE_PAGES") {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(PAGES_TO_CACHE)
      }).then(() => {
        console.log("[SW] All pages cached")
      })
    )
  }
})

console.log("[SW] Service Worker loaded")