# playbyplay [![Build Status](https://travis-ci.org/peferron/playbyplay.svg)](https://travis-ci.org/peferron/playbyplay) [![Coverage Status](https://coveralls.io/repos/peferron/playbyplay/badge.svg?branch=master)](https://coveralls.io/r/peferron/playbyplay?branch=master)

playbyplay is a browser library that shows users of language playgrounds a history of their experiments.

playbyplay weighs ~2.5k minified & gzipped (JS ~1k + CSS ~0.5k + [localhistory](https://github.com/peferron/localhistory) ~1k) and has no other dependencies.

A [very simple demo](https://rawgit.com/peferron/playbyplay/master/demo/index.html) is available in the `demo` directory.

# Installation

1. Download `localhistory.min.js` from the `localhistory` directory.
2. Download `playbyplay.min.js` and `playbyplay.min.css` from the `dist` directory.
2. Add them to your web page:
    
    ```html
    <link rel="stylesheet" href="playbyplay.min.css">
    <!-- localhistory.min.js must be before playbyplay.min.js -->
    <script src="localhistory.min.js"></script>
    <script src="playbyplay.min.js"></script>
    ```

# Usage

## playbyplay.append(run, [options], [callback])

Appends a run to history.

##### Arguments

* **`run`** is the run to append to history. `run` should have the following structure:

    ```js
    {
        input: 'The code inputted by the user',
        output: 'The playground output',
        status: 'success' or 'warning' or 'error' (optional)
    }
    ```
* **`[options]`** is an optional set of key/value pairs passed to [localhistory.append](https://github.com/peferron/localhistory#localhistoryappendkey-entry-options-callback). `appendIfEqualToLast` is set to `false` by default.
* **`[callback]`** is an optional callback function, taking one argument:
  * **`err`** is `null` if the run was appended successfully, or an `Error` object if the run was not appended successfully.

##### Example

```js
var run = {
    input: 'console.log(1 + 1);',
    output: '2',
    status: 'success'
};
playbyplay.append(run);
```

## playbyplay.show([options], callback)

Shows a view of all runs previously appended to history. The user can either restore a run, or dismiss the view.

##### Arguments

* **`[options]`** is an optional set of key/value pairs:
  * **`parent`** is the DOM element into which the view will be appended. Defaults to `document.body`.
  * **`onShow`** is a callback function, taking one argument:
    * **`err`** is `null` if the runs were shown successfully, or an `Error` object if the runs were not shown successfully.
* **`callback`** is a callback function, taking one argument:
  * **`run`** is the run to restore, or `undefined` if the user dismissed the view.

##### Example

```js
playbyplay.show(function(run) {
    if (run) {
        // Replace the contents of the playground input textarea with `run.input`.
        document.getElementById('input-textarea').value = run.input;
    }
});
```

## playbyplay.clear([callback])

Clears history, removing all previously appended runs.

##### Arguments

* **`[callback]`** is an optional callback function, taking one argument:
  * **`err`** is `null` if the history was cleared successfully, or an `Error` object if the history was not cleared successfully.

##### Example

```js
playbyplay.clear();
```

## playbyplay.supported

`true` if the browser supports playbyplay, and `false` otherwise.

See [localhistory.supported](https://github.com/peferron/localhistory#localhistorysupported) for the list of required features.

# Contributing

Install dependencies:

```shell
$ npm install
```

Lint and test:

```shell
$ npm test
```

Refresh demo and run tests after each change:

```shell
$ npm run watch
```

[ECMAScript 2015](https://github.com/lukehoban/es6features) and above are encouraged, but keep an eye on `dist_dev/playbyplay.js` to make sure the transpiled ES5 code does not become bloated by runtimes and polyfills.
