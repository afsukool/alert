self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(response) {
            // Clone the response to modify the headers
            let newHeaders = new Headers(response.headers);
            newHeaders.append('X-Frame-Options', 'DENY');

            let moddedResponse = new Response(response.body, {
                status: response.status,
                statusText: response.statusText,
                headers: newHeaders
            });

            return moddedResponse;
        })
    );
});