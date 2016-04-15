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
  , description
  , options = []
  } = require('./src/rules/' + rule)

  let res = `# ${rule}`
  const line = str => res += '\n' + (str || "")

  if ( !description ) {
    console.warn(`no description for rule \`${rule}\``)
  }

  if ( pass.length === 0 ) {
    console.warn(`no passing test cases for rule \`${rule}\``)
  }

  if ( fail.length === 0 ) {
    console.warn(`no failing test cases for rule \`${rule}\``)
  }

  line()
  line(description || "*no description*")
  line()

  line('## Options')
  line()
  if ( options.length === 0 ) {
    line('*This rule takes no options*')
  } else {
    line('This rule takes the following options')
    options.forEach(function (opt, i) {
      line(`  ${i + 1}.  ${opt.description} (**${opt.type || "any"}**)`)
      line(`      default: \`${JSON.stringify(opt.def)}\``)
    })
  }
  line()

  line('## Passes')
  line()
  line('These elements are passed by this rule')
  line('```js')
  line(pass.map(function (ok) {
    return `// no problem when ${ok.when}\n`
      + ReactDOM.renderToStaticMarkup(ok.render(React))
  }).join('\n\n'))
  line('```')

  line()
  line('## Fails')
  line()
  line('These elements are *not* passed by this rule')
  line('```js')
  line(fail.map(function (bad) {
    return `// warns when ${bad.when}\n`
      + ReactDOM.renderToStaticMarkup(bad.render(React))
  }).join('\n\n'))
  line('```')
  line()
  line('## See also')
  line()
  defn.forEach(function (def) {
    if ( def.url ) {
      line(` - [This document](${def.url})`)
    }
    if ( def.AX ) {
      line(` - Google Audit defs [${def.AX}](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-defs#${def.AX.toLowerCase()})`)
    }
  })

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
