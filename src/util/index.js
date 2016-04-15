export isInteractive from './is-interactive'
export hiddenFromAT  from './hidden-from-at'
export listensTo     from './listens-to'
export trueish       from './trueish'
export hasProp       from './has-prop'
export aria          from './aria'
export DOM           from './DOM'
export role          from './role'

export const devices = {
  screenReaders: Symbol('screenReaders')
, keyboardOnly:  Symbol('keyboardOnly')
, mobile:        Symbol('mobile')
}

// simple callback
export const fn = () => null
