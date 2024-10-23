self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {
            // Check if the response is valid
            if (!response || response.status !== 200) {
                return response; // If the response is not okay, return it directly
            }

            // Clone the response to modify the headers
            let newHeaders = new Headers(response.headers);
            newHeaders.append('X-Frame-Options', 'DENY');

            // Create a modified response with updated headers
            let moddedResponse = new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: newHeaders
            });

            return moddedResponse;
        }).catch(function(error) {
            console.error('Fetch failed; returning offline page instead.', error);
            // Optionally return a fallback response or an offline page
            return new Response('Offline', { status: 503 }); // Example offline response
        })
    );
});
