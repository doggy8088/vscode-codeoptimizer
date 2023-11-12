import * as vscode from 'vscode';

let logger: vscode.OutputChannel;

export function activate(ctx: vscode.ExtensionContext) {
  logger = vscode.window.createOutputChannel('程式碼優化大師');
  logger.appendLine('程式碼優化大師已啟動');

  ctx.subscriptions.push(
    vscode.commands.registerCommand(
      'codeoptimizer.add_selection',
      addCodeOptimizerSelection
    )
  );
  ctx.subscriptions.push(
    vscode.commands.registerCommand(
      'codeoptimizer.add_wholefile',
      addCodeOptimizerWholeDocument
    )
  );
}

export function deactivate() {}

function SendToChatGPT(
  e: vscode.TextEditor,
  d: vscode.TextDocument,
  sel: vscode.Selection[]
) {

  for (var x = 0; x < sel.length; x++) {
    let txt: string = d.getText(new vscode.Range(sel[x].start, sel[x].end));

    const baseUrl = 'https://chat.openai.com/g/g-UEZYckKpa-cheng-shi-ma-you-hua-da-shi';

    let relativePath = getRelativePath();

    const workspaceName = vscode.workspace.name;

    let prompt = `專案名稱: ${workspaceName}
檔案路徑: ${relativePath}
程式語言: ${d.languageId}
程式碼內容如下:
"""
${txt}
"""`;

    logger.appendLine(`prompt: ${prompt}`);

    let promptTextEncoded = encodeURIComponent(prompt);
    let promptChatGPTURL = `${baseUrl}#autoSubmit=1&prompt=${promptTextEncoded}`;

    vscode.env.openExternal(vscode.Uri.parse(promptChatGPTURL));

    // switch (d.languageId) {
    //   case 'csharp':
    //     break;

    //   default:
    //     break;
    // }

  }

}

function getRelativePath() {
  let e = vscode.window.activeTextEditor;
  if (e) {
    let filePath = e.document.uri.fsPath;
    let relativePath = vscode.workspace.asRelativePath(filePath);
    // logger.appendLine(`檔案路徑: ${relativePath}`);
    return relativePath;
  }
}

function addCodeOptimizerSelection() {
  let e = vscode.window.activeTextEditor;
  if (e) {
    let d = e.document;
    let sels = e.selections;
    SendToChatGPT(e, d, [...sels]);
  }
}

function addCodeOptimizerWholeDocument() {
  let e = vscode.window.activeTextEditor;
  if (e) {
    let d = e.document;
    let sel = new vscode.Selection(
      new vscode.Position(0, 0),
      new vscode.Position(Number.MAX_VALUE, Number.MAX_VALUE)
    );
    SendToChatGPT(e, d, [sel]);
  }
}
