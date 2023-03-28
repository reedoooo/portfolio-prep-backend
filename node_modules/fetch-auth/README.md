# fetch-auth

[![Build Status](https://travis-ci.org/UXtemple/fetch-auth.svg?branch=master)](https://travis-ci.org/UXtemple/fetch-auth)

Helper to [fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) resources that need
authentication.

This library doesn't polyfill `fetch` nor `Promise` in the browser.
If you're looking for its node counterpart, install `fetch-auth-node` instead as it includes
`node-fetch`.

## Use

```
import fetchAuth from 'fetch-auth'; // or 'fetch-auth-node'

try {
  const data = await fetchAuth('https://my.endpoint.com/resource', 'Bearer: TOKEN');

  // do something with data
} catch(err) {
  console.error('something went wrong', err);
}
```

You can also use it without async/await and import/export as follows:


```
var fetchAuth = require('fetch-auth'); // or 'fetch-auth-node'

try {
  fetchAuth('https://my.endpoint.com/resource', 'Bearer: TOKEN')
    .then(function(data) {
      // do something with data
    });
} catch(err) {
  console.error('something went wrong', err);
}
```

Please note that this helper `throws` if the response's status isn't in the 2xx range.

License MIT.

Made with <3 by UXtemple
