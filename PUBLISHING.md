# Voice Copilot Extension - Publishing Guide

## 📦 パッケージ状態

✅ 完了:
- `.vsix` ファイル生成済み: `voice-copilot-extension-0.0.1.vsix`
- サイズ: 13.59 KB
- ファイル数: 12 ファイル

## 🚀 マーケットプレイスに公開する手順

### 前提条件

1. **Azure DevOps アカウント** が必要
   - https://dev.azure.com に登録
   - Organization を作成

2. **Personal Access Token (PAT)** を生成
   - Azure DevOps > User Settings > Personal Access Tokens
   - Scopes: Marketplace (Publish) にチェック
   - Token をコピーして保存

### 手順 1: Publisher を登録

```bash
vsce create-publisher <publisher-name>
```

例:
```bash
vsce create-publisher voice-copilot
```

プロンプトで PAT を入力

### 手順 2: .vsix ファイルを公開

```bash
cd /Users/hsunwenfang/Documents/jp202604/voice-copilot-extension
vsce publish
```

または直接パッケージを公開:

```bash
vsce publish --packagePath voice-copilot-extension-0.0.1.vsix
```

### 手順 3: マーケットプレイスで確認

https://marketplace.visualstudio.com/search?term=voice-copilot

数分後に拡張機能が表示されます。

## 📋 ローカルにインストール（テスト用）

公開前にローカルでテストする場合:

```bash
# 既存の .vsix ファイルをインストール
code --install-extension voice-copilot-extension-0.0.1.vsix
```

## 🔧 更新時の手順

バージョンを更新する場合:

### 1. package.json でバージョンアップ
```json
"version": "0.0.2"
```

### 2. 再度パッケージ化
```bash
npm run vscode:prepublish
vsce package
```

### 3. 公開
```bash
vsce publish
```

または version を指定:
```bash
vsce publish patch  # 0.0.1 → 0.0.2
vsce publish minor  # 0.0.1 → 0.1.0
vsce publish major  # 0.0.1 → 1.0.0
```

## ✨ マーケットプレイスに表示される情報

以下の情報が自動的にマーケットプレイスで表示されます:

- **名前**: Voice Copilot Chat
- **説明**: Talk to GitHub Copilot with voice input and output
- **バージョン**: 0.0.1
- **大カテゴリ**: AI, Copilot
- **README**: README.md ファイルの内容
- **License**: LICENSE ファイル
- **Repository**: GitHub リンク
- **Publisher**: voice-copilot

## 🎯 マーケットプレイスで見栄え良くするコツ

1. **README を充実させる**
   - スクリーンショット・GIF を追加
   - 機能の詳しい説明

2. **Icon を追加** (オプション)
   ```json
   "icon": "icon.png"  // 128x128 PNG
   ```

3. **ガイドを書く**
   - CHANGELOG.md で更新履歴
   - CONTRIBUTING.md で開発への参加方法

4. **タグを活用**
   ```json
   "keywords": ["voice", "copilot", "chat", "ai", "speech"]
   ```

## 🐛 トラブルシューティング

**エラー: "Invalid Personal Access Token"**
- PAT の有効期限を確認
- Scopes が Marketplace に設定されているか確認

**エラー: "Publisher not found"**
- Publisher が正しく登録されているか確認
- `vsce list-publishers` で確認

**エラー: "Permission denied"**
- Azure DevOps で Publisher に対する権限を確認

## 📊 公開後の運営

- GitHub で Issues、Pull Requests を管理
- 定期的に新機能、バグ修正をリリース
- マーケットプレイスの統計情報を監視

## 💡 参考リンク

- [VS Code Extension Publishing](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [vsce Documentation](https://github.com/microsoft/vscode-vsce)
- [VS Code Marketplace](https://marketplace.visualstudio.com/VSCode)

---

**現在の状態**: ✅ 公開準備完了！

次は Azure DevOps で Publisher を登録し、PAT を取得すれば、以下のコマンドで即座に公開できます：

```bash
vsce publish
```
