# Voice Copilot Extension

A VS Code extension that enables voice conversations with GitHub Copilot using Web Speech API for speech-to-text and text-to-speech.

## Features

- 🎤 **Voice Input**: Speak your questions directly using the browser's Web Speech API
- 🔊 **Voice Output**: Hear Copilot's responses read aloud
- 📝 **Text Chat**: Type messages as an alternative to voice
- 💬 **Chat History**: View your conversation history in the sidebar
- ✨ **GitHub Copilot Integration**: Uses GitHub Copilot's language models

## Requirements

- VS Code 1.96.0 or later
- GitHub Copilot extension installed and authenticated
- A modern browser with Web Speech API support (Chrome, Edge, Safari recommended)

## Installation

1. Clone or copy this folder to your VS Code extensions directory
2. Open a terminal in the extension folder
3. Run:
   ```bash
   npm install
   npm run compile
   ```
4. In VS Code, press F5 to open the Extension Development Host with this extension loaded

## Usage

1. Open Command Palette (Cmd+Shift+P)
2. Run: `Voice Copilot: Start Voice Chat`
3. A new panel will open on the side
4. Choose one of these methods to interact:
   - **Listen**: Click the "🎤 Listen" button to speak your question
   - **Type**: Type directly in the text area
   - **Send**: Click "Send to Copilot" or press Cmd+Enter (Mac) / Ctrl+Enter (Windows)
5. Copilot's response will appear in the chat history
6. Click "🔊 Speak Response" to hear the response read aloud

## How It Works

### Architecture

```
Voice Input → Web Speech API (STT) → Text → Copilot API → Response Text → TTS → Voice Output
```

### Components

- **extension.ts**: Main extension that manages the Webview and communicates with Copilot API
- **script.js**: Handles Web Speech API for voice input/output and UI interactions
- **style.css**: VS Code-themed styling for the chat panel

### Key Technologies

- **Web Speech API**: Handles speech-to-text and text-to-speech conversion
- **Language Model API**: Communicates with GitHub Copilot models
- **Webview API**: Provides the UI within VS Code

## Limitations

- Speech recognition and synthesis quality depends on the browser
- Initial response may take a few seconds
- Requires valid GitHub Copilot authentication
- Web Speech API support varies by browser (best on Chrome, Edge, Safari)

## Troubleshooting

### "Copilot model not available"
- Ensure GitHub Copilot extension is installed
- Authenticate with GitHub in VS Code
- Check that you have an active Copilot subscription or free plan

### Voice input not working
- Verify your browser supports Web Speech API (Chrome, Edge, Safari recommended)
- Check microphone permissions in your browser
- Try typing instead

### Voice output not working
- Check system volume
- Verify text-to-speech is enabled in your browser
- Try different browser if available

## Development

To modify and debug:

```bash
# Watch for TypeScript changes
npm run watch

# Press F5 in VS Code to launch Extension Development Host
```

## License

MIT
