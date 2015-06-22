# playbyplay

playbyplay is a browser library that shows users of language playgrounds a history of their experiments.

A [very simple demo](https://rawgit.com/peferron/playbyplay/master/demo/index.html) is available in the `demo` directory.

# Installation

1. Download `playbyplay-bundle.min.js` and `playbyplay.min.css` from the `dist` directory.
2. Add them to your web page:
    
    ```html
    <link rel="stylesheet" href="playbyplay.min.css">
    <script src="playbyplay-bundle.min.js"></script>
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
* **`[options]`** is an optional set of key/value pairs. See [localhistory.append](https://github.com/peferron/localhistory#localhistoryappendkey-entry-options-callback).
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

## playbyplay.show(callback)

Shows a view of all runs previously appended to history. The user can either restore a run, or dismiss the view.

##### Arguments

* **`callback`** is a callback function, taking two arguments:
  * **`err`** is `null` if the runs were shown successfully, or an `Error` object if the runs were not shown successfully.
  * **`run`** is the run to restore, or `undefined` if the user dismissed the view.

##### Example

```js
playbyplay.show(function(err, run) {
    if (err) {
        console.error('Show failed:', err);
        return;
    }
    if (run) {
        console.log('Restoring run:', run);
        // Replace the contents of the playground
        // input textarea with `run.input`.
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
