# build-import-map
WIP! Builds import tree of local files of a JavaScript project

```sh
npx build-import-map index.js
```

**In Node.js,** or projects where you use `require()` to import files, use `--module-type require` flag
```sh
npx build-import-map <entry-file>.js --module-type require
```


## Usage

### Command
```sh
npx build-import-map <entry-file-path> --module-type <require|import>
```



## Contributing

- Fork this repository

```sh
git clone <url-of-your-fork>
cd build-import-map
npm link # use sudo if needed
cd example 
build-import-map index.js --module-type require
```