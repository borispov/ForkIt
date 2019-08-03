function template(jsx, tags, title='goody', initState = {}, initialApolloState) {
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>{title}</title>
      ${tags}
    </head>

    <body>
      <div id="root">${jsx}</div>
      // <script>window.__STATE__ = ${JSON.stringify()};</script>
      <script>
        window.__APOLLO_STATE__ = ${JSON.stringify(initialApolloState)}
      </script>
      <script src="/bundle.main.js"></script>
    </body>

    </html>
  `
}

module.exports = {
  template
}
