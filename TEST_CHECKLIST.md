# Voice Copilot Extension - Test Checklist

## Pre-Test Verification

✅ Completed:
- [x] npm install
- [x] npm run compile
- [x] Webview files copied to out/

## Manual Testing Steps

### Step 1: Launch Extension Development Host
- [ ] In VS Code, press **F5** (or Run > Start Debugging)
- [ ] A new VS Code window will open labeled "Extension Development Host"
- [ ] Wait 5-10 seconds for extension to activate

### Step 2: Verify Extension Activation
- [ ] Open Command Palette: **Cmd+Shift+P** (Mac) or **Ctrl+Shift+P** (Windows/Linux)
- [ ] Type: `Voice Copilot: Start Voice Chat`
- [ ] Ensure command appears in the list
- [ ] Press Enter

### Step 3: Check Voice Copilot Panel
- [ ] A new panel appears on the right side labeled "Voice Copilot Chat"
- [ ] Panel contains:
  - [ ] Title: "Voice Copilot Chat"
  - [ ] 🎤 Listen button
  - [ ] 🔊 Speak Response button (initially disabled)
  - [ ] Clear button
  - [ ] Status text
  - [ ] Text input area
  - [ ] Send to Copilot button

### Step 4: Test Text Input
- [ ] Type a message in the text area: "Hello, what is JavaScript?"
- [ ] Click "Send to Copilot" or press Cmd+Enter
- [ ] Message appears in chat history as user message
- [ ] Wait for response (2-5 seconds)
- [ ] Copilot's response appears in chat history

### Step 5: Test Voice Input (Optional)
- [ ] Click the 🎤 Listen button
- [ ] Speak clearly: "What is the weather today?"
- [ ] Button shows "🎤 Listening..." while recording
- [ ] After speaking, text appears in input field
- [ ] Click Send to Copilot to test

### Step 6: Test Voice Output (Optional)
- [ ] After receiving a response, 🔊 Speak Response button enables
- [ ] Click 🔊 Speak Response
- [ ] Response text is read aloud by your system's text-to-speech

### Step 7: Test Clear Button
- [ ] Click Clear button
- [ ] Chat history is cleared
- [ ] Input field is cleared
- [ ] 🔊 Speak Response button becomes disabled

## Debugging

If issues occur:

1. **Extension doesn't appear in Command Palette**
   - Check: Run > Start Debugging console for errors
   - Verify: command "voice-copilot.start" in package.json

2. **Error connecting to Copilot**
   - Verify: GitHub Copilot extension is installed
   - Check: Sign in to GitHub in VS Code
   - Ensure: You have Copilot Free or subscription

3. **Webview not showing**
   - Check: VS Code Developer Tools (F12 in Extension Host)
   - Look for errors in Console tab

4. **Voice input/output not working**
   - Verify: Browser supports Web Speech API (Chrome, Safari, Edge)
   - Check: Microphone permissions granted
   - Test: Try text input first

## Success Criteria

✅ Extension is successfully tested when:
- [x] Extension activates (visible in command palette)
- [x] Webview panel opens
- [x] Text message sent to Copilot
- [x] Response received from Copilot
- [x] Response displayed in chat history

