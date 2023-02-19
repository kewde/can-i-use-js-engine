// This file is prepended to the user-supplied JavaScript to help polyfill some stuff
global = globalThis;
global.console = {
    log: (...params) => print(...params),
    error: (...params) => print(...params),
};
