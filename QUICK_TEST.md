# 🚀 Quick Test Guide - Voice Copilot Extension

## ✅ 前提条件
- VS Code が開いている
- このフォルダ (voice-copilot-extension) が翅 workspace として開かれている
- GitHub Copilot 拡張がインストール済み

## 🎯 ステップ 1: Run & Debug ビューを開く

**方法 A: キーボード**
- Mac: `Cmd+Shift+D`
- Windows/Linux: `Ctrl+Shift+D`

**方法 B: マウス**
- 左サイドバーの Run アイコン (▶️ 記号) をクリック

## 🎯 ステップ 2: Debug Configuration を選択

- ドロップダウン (現在「No configuration」と表示) をクリック
- 「Extension」を選択

## 🎯 ステップ 3: デバッグを開始

- 緑の ▶️ ボタンをクリック
- または F5 キーを押す
- 自動で TypeScript コンパイルが実行されます

## ⏳ 待機

- 新しい VS Code ウィンドウが開きます
- タイトルバーに「[Extension Development Host]」と表示されます
- 5-10 秒待機

## 🎯 ステップ 4: Voice Copilot を起動

**新ウィンドウで:**

1. キーボード: `Cmd+Shift+P` または `Ctrl+Shift+P`
2. 検索欄に入力: `Voice Copilot`
3. 「Voice Copilot: Start Voice Chat」を選択
4. Enter キーを押す

## ✨ 結果

- 右側パネルに「Voice Copilot Chat」が表示されます
- チャットイントロダクションとボタンが見えます

## 🐛 トラブルシューティング

### 問題: 「Extension」が見当たらない
- **解決**: 左のフォルダアイコンをクリック > このフォルダを確認
- 再度 Cmd+Shift+D で Run ビューを開く

### 問題: F5 何も起こらない
- **解決**: コンソール (Ctrl+ grave) を確認 > エラーを探す
- 「npm: compile」が成功したか確認

### 問題: 拡張が起動しない
- **解決**: 前のウィンドウで GitHub Copilot が有効か確認
- 認証状態を確認 (Accounts をクリック)

---

**完成！ Voice Copilot Extension のテストが開始されました 🎉**
