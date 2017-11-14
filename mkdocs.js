import React      from 'react'
import ReactDOM   from 'react-dom/server'
import rules      from './src/rules'
import fs         from 'fs'
import path       from 'path'
import URL        from 'url'

const host = function (url) {
  return URL.parse(url).host.replace(/^www\./, '')
}

const renderOptions = function (options) {
  if ( options.length === 0 ) {
    return '*This rule takes no options*'
  } else {
    return [
      'This rule takes the following options:'
    , ...options.map(function (opt, i) {
        return [
          `  ${i + 1}.  ${opt.description} (**${opt.type || "any"}**)`
        , `      default: \`${JSON.stringify(opt.def)}\``
        ].join('\n')
      })
    ].join('\n')
  }
}

const renderExamples = function (examples, result) {
  return [
    '```js'
  , examples.map(function (example) {

    // render custom example options
    const opts = example.opts
      ? `\n// (using options: ${JSON.stringify([ "warn", ...example.opts ])})`
      : ``

    // render description
    return `// ${result} when ${example.when}${opts}\n`
         + ReactDOM.renderToStaticMarkup(example.render(React))
    }).join('\n\n')
  , '```'
  ].join('\n')
}


const renderURLS = function (defn) {
  return defn.map(function (def) {
    let res = ''
    if ( def.url ) {
      res += ` - [This document](${def.url}) from ${host(def.url)}`
    }
    if ( def.AX ) {
      res += ` - Google Audit defs [${def.AX}](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-defs#${def.AX.toLowerCase()})`
    }
    return res
  }).join('\n')
}

Object.keys(rules).forEach(function (rule) {
  const {
    'default': defn
  , pass = []
  , fail = []
  , description
  , options = []
  } = require('./src/rules/' + rule)

  if ( !description ) {
    console.warn(`no description for rule \`${rule}\``)
  }

  if ( pass.length === 0 ) {
    console.warn(`no passing test cases for rule \`${rule}\``)
  }

  if ( fail.length === 0 ) {
    console.warn(`no failing test cases for rule \`${rule}\``)
  }

  const res =
`# ${rule}
${description || "*no description*"}

## options

${renderOptions(options)}

## Passes

${renderExamples(pass, "passes")}

## Fails

${renderExamples(fail, "fails")}

## See also

${renderURLS(defn)}

`

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
