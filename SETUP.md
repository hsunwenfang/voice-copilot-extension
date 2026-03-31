# Voice Copilot Extension - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
cd /Users/hsunwenfang/Documents/jp202604/voice-copilot-extension
npm install
```

### 2. Compile TypeScript

```bash
npm run compile
```

Or watch mode for development:
```bash
npm run watch
```

### 3. Run the Extension

- Open VS Code
- Open this folder as workspace
- Press **F5** to launch Extension Development Host
- In the new VS Code window, open Command Palette (Cmd+Shift+P)
- Run: `Voice Copilot: Start Voice Chat`

### 4. Configure GitHub Copilot

If not already done:
1. Install [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension
2. Sign in with your GitHub account
3. Ensure you have Copilot Free or a paid subscription

### 5. Test Voice Input

1. Click the "🎤 Listen" button in the Voice Copilot panel
2. Speak clearly (default language: English)
3. Your speech will be converted to text
4. Spoken text appears in the input field

### 6. Send to Copilot

- Click "Send to Copilot" or press Cmd+Enter / Ctrl+Enter
- Wait for response (usually 2-5 seconds)
- Copilot's response appears in chat history

### 7. Hear the Response

- Click "🔊 Speak Response" button to hear it read aloud
- Volume controlled by system audio

## Project Structure

```
voice-copilot-extension/
├── src/
│   ├── extension.ts       # Main extension code
│   └── webview/
│       ├── script.js      # Voice & chat logic
│       └── style.css      # UI styling
├── package.json           # Extension metadata
├── tsconfig.json          # TypeScript config
├── .vscodeignore          # Files to ignore in package
└── README.md              # User documentation
```

## Next Steps

### Customization Ideas

1. **Change Language**: Edit `recognition.lang = "en-US"` in script.js to use other languages (e.g., "ja-JP", "es-ES")

2. **Custom System Prompt**: Modify extension.ts to add a system message to Copilot requests

3. **Save Chat History**: Add persistence between sessions using VS Code's storage APIs

4. **Multiple Models**: Add dropdown to switch between different Copilot models

5. **Command Integration**: Add more slash commands for specific tasks

### Building for Distribution

To package as .vsix file:

```bash
npm install -g vsce
vsce package
```

This creates `voice-copilot-extension-0.0.1.vsix` ready for distribution.

## Debugging

### Enable Extension Debug Logs

In VS Code Extension Host, open Developer Tools (Help > Toggle Developer Tools) to see console logs.

### Common Issues

**Issue**: Extension doesn't activate
- Solution: Ensure command is registered correctly in package.json

**Issue**: Webview not showing
- Solution: Check browser console (F12 in Extension Host) for errors

**Issue**: Copilot returns "model not available"
- Solution: Verify GitHub Copilot extension is installed and you're authenticated

## API Reference

### Copilot Model Selection

```typescript
const models = await vscode.lm.selectChatModels({
  vendor: "copilot",
  family: "gpt-4o"  // or "gpt-4-turbo", "gpt-4", "gpt-3.5-turbo"
});
```

### Web Speech API Supported Languages

- English: `en-US`, `en-GB`, `en-AU`
- Japanese: `ja-JP`
- Chinese: `zh-CN`, `zh-TW`
- Spanish: `es-ES`
- French: `fr-FR`
- German: `de-DE`
- And many more...

## Performance Tips

1. **Faster Processing**: Shorter, more specific prompts get faster responses
2. **Battery Saver**: Disable TTS for text-only mode to save battery
3. **Network**: Ensure stable internet connection for API calls

Enjoy voice conversations with Copilot!
