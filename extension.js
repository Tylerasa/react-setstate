const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "react-setstate.setState",
    async function () {
      const inputText = await vscode.window.showInputBox({
        placeHolder: "Eg: show modal",
        prompt:
          "Enter the name of your state, and optionally, provide a default value separated by a comma.",
      });

      if (!inputText) {
        vscode.window.showErrorMessage(
          "You need to type in something for this to work 😊."
        );
        return;
      }

      if (inputText == null) return;

      let [stateName, ...defaultValue] = inputText
        .split(",")
        .map((item) => item.trim());
      defaultValue = defaultValue.join(", ");

      if (!stateName) {
        vscode.window.showErrorMessage("State name cannot be empty.");
        return;
      }

      const stateList = [];
      const actionList = [];

      stateName.split(" ").forEach((word, index) => {
        if (index !== 0) {
          stateList.push(capitalize(word));
        } else {
          stateList.push(word);
        }
        actionList.push(capitalize(word));
      });

      const transformedState = stateList.join("");
      const transformedAction = "set" + actionList.join("");
      let defaultValueText = defaultValue || "";

      console.log("defaultValue", defaultValue);

      if (defaultValue !== undefined) {
        defaultValueText = getFormattedDefaultValue(defaultValue);
      }

      const text = `const [${transformedState} , ${transformedAction}] = useState(${defaultValueText})`;

      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const selection = editor.selection;

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, text);
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

function capitalize(word) {
  return word.charAt().toUpperCase() + word.slice(1);
}

function getFormattedDefaultValue(value) {
  try {
    const parsedValue = JSON.parse(value);
	console.log("parsing");
    return JSON.stringify(parsedValue, null, 2);
  } catch (error) {
    // If parsing as JSON fails, check for boolean or number
    if (isBooleanOrNumber(value)) {
      return value;
    }
    
    return `"${value}"`;
  }
}

function isBooleanOrNumber(value) {
  return (
    value.toLowerCase() === "true" ||
    value.toLowerCase() === "false" ||
    !isNaN(value)
  );
}

module.exports = {
  activate,
  deactivate,
};

// - intelligence grabbing done
// -  typescript support
// - object support done
