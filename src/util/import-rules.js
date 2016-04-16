import path from 'path'

/**
 * Imports all rules in a directory based on an array
 * of rule names
 * @arg {string} base - the base directory where the rules live
 * @arg {Array} rules - an array of strings with the names of the rules
 * @returns {Object} - an object of rules, keyed by their name
 */
export default function (base, rules) {
  return rules.reduce(function (acc, rule) {
    return {
      ...acc
    , [rule]: require(path.join(base, rule)).default
    }
  }, {})
}

