const vscode = acquireVsCodeApi();

// 要素の取得
const listenBtn = document.getElementById("listenBtn");
const speakBtn = document.getElementById("speakBtn");
const sendBtn = document.getElementById("sendBtn");
const clearBtn = document.getElementById("clearBtn");
const textInput = document.getElementById("textInput");
const chatHistory = document.getElementById("chatHistory");
const status = document.getElementById("status");

let recognition;
let lastResponse = "";
let isListening = false;

// Web Speech API の初期化
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showStatus("Browser does not support Web Speech API", "error");
    listenBtn.disabled = true;
    return false;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.onstart = () => {
    isListening = true;
    listenBtn.textContent = "🎤 Listening...";
    listenBtn.disabled = true;
    showStatus("Listening...", "system");
  };

  recognition.onresult = (event) => {
    let interim = "";
    let final = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        final += transcript + " ";
      } else {
        interim += transcript;
      }
    }

    if (final) {
      textInput.value = final.trim();
    }
  };

  recognition.onerror = (event) => {
    showStatus(`Speech recognition error: ${event.error}`, "error");
  };

  recognition.onend = () => {
    isListening = false;
    listenBtn.textContent = "🎤 Listen";
    listenBtn.disabled = false;
  };

  return true;
}

// 音声認識を開始
function startListening() {
  if (!recognition) {
    if (!initSpeechRecognition()) {
      return;
    }
  }
  recognition.start();
}

// Copilot に送信
function sendToCopilot() {
  const text = textInput.value.trim();
  if (!text) {
    showStatus("Please enter a message", "error");
    return;
  }

  addChatMessage(text, "user");
  textInput.value = "";
  speakBtn.disabled = true;

  vscode.postMessage({
    command: "sendPrompt",
    text: text,
  });
}

// チャット履歴にメッセージを追加
function addChatMessage(text, role) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${role}`;
  messageDiv.textContent = text;
  chatHistory.appendChild(messageDiv);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// ステータスを表示
function showStatus(text, type = "system") {
  status.textContent = text;
  status.className = "status";
  if (type !== "system") {
    status.style.color =
      type === "error" ? "var(--vscode-statusBar-errorForeground)" : "var(--vscode-foreground)";
  }
}

// テキスト to スピーチ
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onstart = () => {
    speakBtn.disabled = true;
    showStatus("Speaking...", "system");
  };

  utterance.onend = () => {
    speakBtn.disabled = !!lastResponse;
    showStatus("Done", "system");
  };

  utterance.onerror = (event) => {
    showStatus(`Speech synthesis error: ${event.error}`, "error");
    speakBtn.disabled = !!lastResponse;
  };

  window.speechSynthesis.speak(utterance);
}

// チャットをクリア
function clearChat() {
  chatHistory.innerHTML = "";
  textInput.value = "";
  lastResponse = "";
  speakBtn.disabled = true;
  window.speechSynthesis.cancel();
  showStatus("Chat cleared", "system");
}

// イベントリスナー
listenBtn.addEventListener("click", startListening);
sendBtn.addEventListener("click", sendToCopilot);
speakBtn.addEventListener("click", () => speakText(lastResponse));
clearBtn.addEventListener("click", clearChat);

textInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    sendToCopilot();
  }
});

// Extension からのメッセージを受け取る
window.addEventListener("message", (event) => {
  const message = event.data;

  if (message.command === "response") {
    lastResponse = message.text;
    addChatMessage(message.text, "assistant");
    speakBtn.disabled = false;
    showStatus("Response received. Click Speak Response to hear it.", "system");
  } else if (message.command === "error") {
    addChatMessage(`Error: ${message.text}`, "error");
    showStatus(message.text, "error");
  } else if (message.command === "status") {
    showStatus(message.text, "system");
  }
});

// 初期化
window.addEventListener("load", () => {
  initSpeechRecognition();
  showStatus("Ready. Say something or type a message.", "system");
});
