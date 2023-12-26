# react-setstate README

This Visual Studio Code extension simplifies the creation of React useState hooks by generating code snippets based on user input.
### Features

- **State Declaration**: Easily declare React state using the useState hook.
- **Automatic Typing**: Optionally infer TypeScript types based on the provided default value.
- **Supports Object Declaration**: Handles object-like structures for default values.

### Usage

- Open your react JavaScript or TypeScript file in Visual Studio Code.
- Select the area where you want to create the useState hook.
- Trigger the extension using the command palette (Ctrl+Shift+P or Cmd+Shift+P) and search for React useState.
    * [Windows](http://code.visualstudio.com/docs/languages/markdown): `Ctrl+Shift+P`
    * [Linux](http://code.visualstudio.com/docs/languages/markdown): `Ctrl+Shift+P`
    * [MaxOs](http://code.visualstudio.com/docs/languages/markdown): `⇧+⌘+P`

    
- Enter the state name and, optionally, provide a default value separated by a comma (stateName, defaultValue).



![gif](https://github.com/Tylerasa/react-setstate/raw/main/assets/gif.gif)



### Note

- When providing object-like structures as default values, use a format like {key: "value"}.
- The extension handles various default value types, including strings, numbers, booleans, and object-like structures.
- In case of any issues or incorrect input, the extension defaults to treating the value as a string.

### Installation

- Open Visual Studio Code.
- Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X).
- Search for "React useState".
- Click Install to install the extension.

### Contributing

Contributions are welcome! Feel free to open issues or pull requests in the GitHub repository.
License

This extension is licensed under the MIT License.