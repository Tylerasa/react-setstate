const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "react-setstate.setState",
    async function () {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }
      const isTypeScript = editor.document.languageId.includes('typescript');
      console.log("editor.document.languageId", isTypeScript);
      const inputText = await vscode.window.showInputBox({
        placeHolder: "Eg: is active, true",
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
        defaultValueText = getFormattedDefaultValue(isTypeScript, defaultValue);
      }

      const text = `const [${transformedState} , ${transformedAction}] = useState${
        isTypeScript ? `<${defaultValueText.type}>` : ""
      }(${defaultValueText.value})`;

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

function deactivate() {}

function capitalize(word) {
  return word.charAt().toUpperCase() + word.slice(1);
}

function getFormattedDefaultValue(isTypeScript, value) {
  const isObjectLike = (str) => {
    return /^{.*}$/.test(str.trim());
  };

  try {
    const parsedValue = isObjectLike(value)
      ? eval(`(${value})`)
      : JSON.parse(value);
    console.log("parsedValue", parsedValue);
    if (isTypeScript) {
      if (typeof parsedValue === "string") {
        const sanitizedValue = parsedValue.replace(/"/g, "'");
        return { type: "string", value: `"${sanitizedValue}"` };
      } else if (typeof parsedValue === "number") {
        return { type: "number", value: parsedValue };
      } else if (typeof parsedValue === "boolean") {
        return { type: "boolean", value: parsedValue };
      } else if (parsedValue !== null && typeof parsedValue === "object") {
        // Check for object type
        return { type: "any", value: JSON.stringify(parsedValue) }; // You may need to customize this based on your use case
      }
    } else {
      if (isBooleanOrNumber(value)) {
        return { type: isTypeScript ? "boolean" : "any", value: value };
      } else if (parsedValue !== null && typeof parsedValue === "object") {
        return { type: "object", value: JSON.stringify(parsedValue) };
      }
      // Treat as a string if not a boolean or number
      const sanitizedValue = value.replace(/"/g, "'");
      return { type: "string", value: `"${sanitizedValue}"` };
    }
  } catch (error) {
    console.log("fail");
    // If parsing as JSON fails, check for boolean or number
    if (isBooleanOrNumber(value)) {
      return { type: isTypeScript ? "boolean" : "any", value: value };
    }
    // Treat as a string if not a boolean or number
    const sanitizedValue = value.replace(/"/g, "'");
    return { type: "string", value: `"${sanitizedValue}"` };
  }

  const sanitizedValue = value.replace(/"/g, "'");
  return { type: "string", value: `"${sanitizedValue}"` };
}

function isBooleanOrNumber(value) {
  console.log("isBooleanOrNumber"), value;
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
// -  typescript support done
// |  - infer types for objects
// |  - replace single quotes with double quotes
// support for Objects

// - object support done
