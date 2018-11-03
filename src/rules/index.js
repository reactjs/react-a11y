/* eslint-disable global-require */
export default {
    'click-events-have-key-events': require('./click-events-have-key-events').default,
    'hidden-uses-tabindex': require('./hidden-uses-tabindex').default,
    'img-uses-alt': require('./img-uses-alt').default,
    'label-has-for': require('./label-has-for').default,
    'mouse-events-have-key-events': require('./mouse-events-have-key-events').default,
    'onclick-uses-role': require('./onclick-uses-role').default,
    'interactive-supports-focus': require('./interactive-supports-focus').default,
    'no-access-key': require('./no-access-key').default,
    'no-hash-ref': require('./no-hash-ref').default,
    'img-redundant-alt': require('./img-redundant-alt').default,
    'no-onchange': require('./no-onchange').default,
    'aria-role': require('./aria-role').default,
    'tabindex-no-positive': require('./tabindex-no-positive').default,
    'tabindex-uses-button': require('./tabindex-uses-button').default,
    'aria-unsupported-elements': require('./aria-unsupported-elements').default,

    // DEPRECATED RULES
    'avoid-positive-index': require('./avoid-positive-index').default,
    'button-role-space': require('./button-role-space').default,
    'label-uses-for': require('./label-uses-for').default,
    'mouse-events-map-to-key-events': require('./mouse-events-map-to-key-events').default,
    'onclick-uses-tabindex': require('./onclick-uses-tabindex').default,
    'redundant-alt': require('./redundant-alt').default,
    'use-onblur-not-onchange': require('./use-onblur-not-onchange').default,
    'valid-aria-role': require('./valid-aria-role').default,
    'no-unsupported-elements-use-aria': require('./no-unsupported-elements-use-aria').default
};
