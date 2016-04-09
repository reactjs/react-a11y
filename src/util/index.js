export isInteractive from './is-interactive'
export hiddenFromAT  from './hidden-from-at'
export listensTo     from './listens-to'

export const devices = {
  screenReaders: Symbol('screenReaders')
, keyboardOnly:  Symbol('keyboardOnly')
, mobile:        Symbol('mobile')
}
