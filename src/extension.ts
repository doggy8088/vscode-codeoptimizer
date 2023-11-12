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
    logger.appendLine('-------------------');

    let promptTextEncoded = encodeURIComponent(prompt);
    logger.appendLine(`promptTextEncoded: ${promptTextEncoded}`);
    logger.appendLine('-------------------');

    // The Fragment part of the URL is the part after the # symbol and it will be percent-encoded
    // https://stackoverflow.com/a/20681028/910074
    let promptHash = `autoSubmit=1&prompt=${percentDecode(promptTextEncoded)}`;
    logger.appendLine(`promptHash: ${promptHash}`);
    logger.appendLine('-------------------');

    const baseUrl = 'https://chat.openai.com/g/g-UEZYckKpa-cheng-shi-ma-you-hua-da-shi';

    let promptChatGPTURL = `${baseUrl}#autoSubmit=1&prompt=${promptTextEncoded}`;

    // @ts-ignore
    // Issue: https://github.com/microsoft/vscode/issues/85930#issuecomment-821882174
    vscode.env.openExternal(promptChatGPTURL);
    // @ts-check

    // 使用 vscode.Uri.parse() 會將 fragment 部分的 % 全部都轉成 %25，這樣就等於 Encode 了兩次！
    // vscode.env.openExternal(vscode.Uri.parse(promptChatGPTURL));

    // 使用 vscode.Uri.from() 會將 fragment 部分的 % 全部都轉成 %25，這樣就等於 Encode 了兩次！
    // vscode.env.openExternal(vscode.Uri.from({
    //   scheme: 'https',
    //   authority: 'chat.openai.com',
    //   path: '/g/g-UEZYckKpa-cheng-shi-ma-you-hua-da-shi',
    //   query: '',
    //   fragment: promptHash
    // }));

    // switch (d.languageId) {
    //   case 'csharp':
    //     break;

    //   default:
    //     break;
    // }

  }

}

function percentDecode(str: string) {
  return str.replace('%25', '%');
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
