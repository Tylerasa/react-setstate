
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('react-setstate.setState', async function () {
		const inputText = await vscode.window.showInputBox({
			placeHolder: "Eg: show modal",
			prompt: "Enter the name of your state.",
		  });
	
		  if (inputText === "") {
			vscode.window.showErrorMessage(
			  "You need to type in something for this to work😊."
			);
			return;
		  }
	
		  if (inputText == null) return;
	
		  const words = inputText.split(" ");
		  const stateList = [];
		  const actionList = [];
	
		  for (let i = 0; i < words.length; i++) {
			if (i !== 0) {
			  stateList.push(capitalize(words[i]));
			} else {
			  stateList.push(words[i]);
			}
			actionList.push(capitalize(words[i]));
		  }
	
		  const transformedState = stateList.join("");
		  const transformedAction = "set" + actionList.join("");
		  const text = `const [${transformedState} , ${transformedAction}] = useState(null)`;
	
		  const editor = vscode.window.activeTextEditor;
	
		  if (editor) {
			const selection = editor.selection;
	
			editor.edit((editBuilder) => {
			  editBuilder.replace(selection, text);
			});
		  }
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

function capitalize(word) {
	return word.charAt().toUpperCase() + word.slice(1);
}

  
module.exports = {
	activate,
	deactivate
}
