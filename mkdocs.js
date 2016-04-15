import React      from 'react'
import ReactDOM   from 'react-dom/server'
import rules      from './src/rules'
import fs         from 'fs'
import path       from 'path'


Object.keys(rules).forEach(function (rule) {
  const {
    'default': defn
  , pass = []
  , fail = []
  , description = ''
  } = require('./src/rules/' + rule)

  let res = `# ${rule}`
  const line = str => res += '\n' + str

  line(description || "**no description**")
  line('## Passes')
  line('These elements are passed by this rule')
  line('```js')
  line(pass.map(function (ok) {
    return `// no problem when ${ok.when}\n`
      + ReactDOM.renderToStaticMarkup(ok.render(React))
  }).join('\n\n'))
  line('```')

  line('## Fails')
  line('These elements are *not* passed by this rule')
  line('```js')
  line(fail.map(function (bad) {
    return `// warns when ${bad.when}\n`
      + ReactDOM.renderToStaticMarkup(bad.render(React))
  }).join('\n\n'))
  line('```')
  const file = path.resolve('.', 'docs', 'rules', `${rule}.md`)

  fs.writeFile(file, res, function (err) {
    if ( err ) {
      console.log(err)
      process.exit(1)
    } else {
      console.log(`written ${file}`)
    }
  })
})
