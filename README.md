# build-import-map
WIP! Builds import tree of local files of a JavaScript project

```sh
npx build-import-map index.js
```

The tool will try to figure out what modules system is used from the code, but if it couldn't, you will have to use `--module-type require` or `--module-type import` flag to specify the import type.


## Usage

### Command
```sh
npx build-import-map <entry-file-path> --module-type <require|import>
```

## Flags
- `--module-type <'require' or 'import'>`: Sometimes the tool can't auto-detect the module-system. In that case, you can mention which module system is used in the project.
- `--show-parent`: Adds `(Parent: <name-of-parent>.js)` in the tree.

## Contributing

- Fork this repository

```sh
git clone <url-of-your-fork>
cd build-import-map
npm link # use sudo if needed
cd example 
build-import-map index.js --module-type require
```