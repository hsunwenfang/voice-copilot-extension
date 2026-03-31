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
    }
  );

  const scriptUri = voiceCopilotPanel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "src", "webview", "script.js")
  );
  const styleUri = voiceCopilotPanel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "src", "webview", "style.css")
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

    // リクエストを送信
    const response = await model.sendRequest(
      messages,
      {},
      new vscode.CancellationTokenSource().token
    );

    // レスポンスをストリーミングで受け取る
    let fullResponse = "";
    for await (const fragment of response.text) {
      fullResponse += fragment;
    }

    // Webview に結果を送信
    panel.webview.postMessage({
      command: "response",
      text: fullResponse,
    });
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
