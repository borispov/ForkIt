import React from 'react';

function template(jsx, tags, title='goody', state) {
  return (
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>{title}</title>
      {tags}
    </head>

    <body>
      <div id="root">${jsx}</div>
      <script>
        window.__APOLLO_STATE__ = ${JSON.stringify(state)}
      </script>
      <script src="/bundle.main.js"></script>
    </body>

    </html>
  )
}

export default template
