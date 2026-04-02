import * as vscode from "vscode";
import * as path from "path";

let voiceCopilotPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "voice-copilot.start",
    () => {
      createOrShowVoiceCopilotPanel(context);
    }
  );

  context.subscriptions.push(disposable);
}

function createOrShowVoiceCopilotPanel(context: vscode.ExtensionContext) {
  if (voiceCopilotPanel) {
    voiceCopilotPanel.reveal(vscode.ViewColumn.Beside);
    return;
  }

  voiceCopilotPanel = vscode.window.createWebviewPanel(
    "voiceCopilotChat",
    "Voice Copilot Chat",
    vscode.ViewColumn.Beside,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "out")],
    }
  );

  const scriptUri = voiceCopilotPanel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "out", "webview", "script.js")
  );
  const styleUri = voiceCopilotPanel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "out", "webview", "style.css")
  );

  voiceCopilotPanel.webview.html = getWebviewContent(scriptUri, styleUri);

  // Webview からのメッセージを受け取る
  voiceCopilotPanel.webview.onDidReceiveMessage(
    async (message) => {
      if (message.command === "sendPrompt") {
        const prompt = message.text;
        await handleCopilotRequest(prompt, voiceCopilotPanel!);
      }
    },
    undefined,
    context.subscriptions
  );

  voiceCopilotPanel.onDidDispose(
    () => {
      voiceCopilotPanel = undefined;
    },
    undefined,
    context.subscriptions
  );
}

async function handleCopilotRequest(
  prompt: string,
  panel: vscode.WebviewPanel
) {
  try {
    // 処理中を表示
    panel.webview.postMessage({
      command: "status",
      text: "Sending to Copilot...",
    });

    // Copilot モデルを取得
    const models = await vscode.lm.selectChatModels({
      vendor: "copilot",
      family: "gpt-4o",
    });

    if (models.length === 0) {
      panel.webview.postMessage({
        command: "error",
        text: "GitHub Copilot model not available. Please install GitHub Copilot extension.",
      });
      return;
    }

    const model = models[0];

    // プロンプトを構成
    const messages = [
      vscode.LanguageModelChatMessage.User(prompt),
    ];

    // リクエストを送信（CancellationTokenSource は必ず dispose）
    const cts = new vscode.CancellationTokenSource();
    try {
      const response = await model.sendRequest(messages, {}, cts.token);

      // チャンク毎に Webview へ送信（リアルタイムストリーミング）
      let fullResponse = "";
      for await (const fragment of response.text) {
        fullResponse += fragment;
        panel.webview.postMessage({ command: "chunk", text: fragment });
      }

      panel.webview.postMessage({ command: "responseEnd", text: fullResponse });
    } finally {
      cts.dispose();
    }
  } catch (error: any) {
    let errorMessage = "Unknown error";
    if (error instanceof vscode.LanguageModelError) {
      errorMessage = `Copilot Error: ${error.message} (${error.code})`;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    panel.webview.postMessage({
      command: "error",
      text: errorMessage,
    });
  }
}

function getWebviewContent(
  scriptUri: vscode.Uri,
  styleUri: vscode.Uri
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Voice Copilot Chat</title>
  <link rel="stylesheet" href="${styleUri}">
</head>
<body>
  <div class="container">
    <h1>Voice Copilot Chat</h1>
    <div id="chatHistory" class="chat-history"></div>
    
    <div class="input-section">
      <div class="button-group">
        <select id="langSelect" class="lang-select">
          <option value="ja-JP">🇯🇵 日本語</option>
          <option value="en-US" selected>🇺🇸 English</option>
          <option value="zh-TW">🇹🇼 繁體中文</option>
          <option value="zh-CN">🇨🇳 普通話</option>
        </select>
        <button id="listenBtn" class="btn btn-primary">🎤 Listen</button>
        <button id="speakBtn" class="btn btn-secondary" disabled>🔊 Speak Response</button>
        <button id="clearBtn" class="btn btn-danger">Clear</button>
      </div>
      
      <div id="status" class="status"></div>
      
      <textarea id="textInput" class="text-input" placeholder="Type a message or use the Listen button..."></textarea>
      
      <button id="sendBtn" class="btn btn-success">Send to Copilot</button>
    </div>
  </div>

  <script src="${scriptUri}"></script>
</body>
</html>`;
}

export function deactivate() {}
