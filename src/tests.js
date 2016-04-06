import assertions from './assertions'

const shouldRunTest = function (testName, options = {} ) {
  const {
    exclude = []
  , device
  } = options

  const exclusions = device === 'mobile'
    ? exclude.concat(assertions.mobileExclusions)
    : exclude

  return exclusions.indexOf(testName) === -1
}

const runTagTests = function (tagName, props, children, options, onFailure) {
  const tagTests = assertions.tags[tagName] || []

  Object.keys(tagTests).forEach(function (key) {
    const testFailed =
      shouldRunTest(key, options)
      && !tagTests[key].test(tagName, props, children)

    if (tagTests[key] && testFailed) {
      onFailure(tagName, props, tagTests[key].msg)
    }
  })
}

const runPropTests = function (tagName, props, children, options, onFailure) {
  Object.keys(props).forEach(function (propName) {
    if ( props[propName] !== null || props[propName] !== undefined ) {

      const propTests = assertions.props[propName] || []

      Object.keys(propTests).forEach(function (key) {
        const testTailed =
          shouldRunTest(key, options)
          && !propTests[key].test(tagName, props, children)

        if (propTests[key] && testTailed) {
          onFailure(tagName, props, propTests[key].msg)
        }
      })
    }
  })
}

const runLabelTests = function (tagName, props, children, options, onFailure) {
  const renderTests = assertions.render

  Object.keys(renderTests).forEach(function (key) {
    if (shouldRunTest(key, options) && renderTests[key]) {
      const failureCB = onFailure
        .bind(undefined, tagName, props, renderTests[key].msg)

      renderTests[key].test(tagName, props, children, failureCB)
    }
  })
}

// run all tests
const allTests = [ runTagTests, runPropTests, runLabelTests ]
const runTests = function (tagName, props, children, options, onFailure) {
  allTests.forEach(function (test) {
    test(tagName, props, children, options, onFailure)
  })
}

export default runTests
