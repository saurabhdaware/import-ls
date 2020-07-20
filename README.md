# import-ls

<p align="left"><a href="https://npmjs.org/package/abell"><img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/saurabhdaware/import-ls?style=for-the-badge&labelColor=black&logo=npm&label=import-ls&color=darkred"></a> &nbsp;<a href="https://twitter.com/saurabhcodes"><img alt="Twitter profile badge of @saurabhcodes" src="https://img.shields.io/badge/follow-@saurabhcodes-1DA1F2?style=for-the-badge&logo=twitter&logoColor=1DA1F2&labelColor=black"/></a> </p>


![Cover image of import-ls that displays the tree it has built. The image shows npx import-ls render.js --show-parent command. Documentation for the same is given below](https://res.cloudinary.com/saurabhdaware/image/upload/v1595221648/npm/import-ls-cover.png)

WIP! Builds import tree of local files of a JavaScript project

## Usage

### Command
```sh
npx import-ls <entry-file-path> [--module-type <require|import>] [--show-parent]
```

### Example

```sh
npx import-ls index.js
```

*Note: The tool will try to figure out what modules system is used from the code, but if it couldn't, you will have to use `--module-type require` or `--module-type import` flag to specify the import type.*




## Flags

| Flags                                 | Description                 |
|---------------------------------------|-----------------------------|
| --module-type <'require' or 'import'> | Specify module type         |
| --show-parent                         | Adds parent name to log     |
| --include-modules                     | Includes modules in the log |

## Contributing

- Fork this repository

```sh
git clone <url-of-your-fork>
cd import-ls
npm link # use sudo if needed
cd example 
import-ls index.js --module-type require
```

--- 

Being a patron or backing with a one-time payment through buy me a coffee will help me building more of such tools 🐨 🎉

[<img alt="Buy me a Coffee Button" width=200 src="https://c5.patreon.com/external/logo/become_a_patron_button.png">](https://www.patreon.com/bePatron?u=31891872) &nbsp; [<img alt="Buy me a Coffee Button" width=200 src="https://cdn.buymeacoffee.com/buttons/default-yellow.png">](https://www.buymeacoffee.com/saurabhdaware)

For any help regarding the tool, you can follow me on [Twitter @saurabhcodes](https://twitter.com/saurabhcodes)
