export default {
  async fetch(request, env) {
    // Serve static assets; fall back to index.html for non-file routes so Pages/Workers behave like a static site.
    const url = new URL(request.url);
    const isAsset = url.pathname.split('/').pop().includes('.');

    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404 || isAsset) {
      return assetResponse;
    }

    // Single-page style fallback so routes without extensions still render the main page.
    const indexRequest = new Request(new URL('/index.html', url.origin), request);
    return env.ASSETS.fetch(indexRequest);
  }
};
