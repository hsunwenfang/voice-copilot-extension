# 🚀 Voice Copilot Extension - GitHub & Marketplace 公開ガイド

## ✅ 完了した内容

```
✅ Git初期化完了
   - リポジトリ: /Users/hsunwenfang/Documents/jp202604/voice-copilot-extension/.git
   - 初期コミット: "Initial commit: Voice Copilot Extension v0.0.1"
   - ファイル: 17 files, 1398 insertions

✅ .vsixパッケージ準備完了
   - ファイル: voice-copilot-extension-0.0.1.vsix
   - サイズ: 14 KB
   - 配布準備完全OK
```

## 📝 次のアクション（段階別）

### 📍 STEP 1: GitHub リポジトリを作成

**手作業**: GitHub.com で実施

1. https://github.com/new にアクセス
2. Repository name: `voice-copilot-extension`
3. Description: `Talk to GitHub Copilot with voice input and output`
4. Public/Private: 任意（推奨: Public）
5. "Create repository" クリック

**作成後、GitHub が以下を表示します:**
```
…create a new repository on the command line
git remote add origin https://github.com/YOUR-USERNAME/voice-copilot-extension.git
git branch -M main
git push -u origin main
```

---

### 📍 STEP 2: GitHub にプッシュ

**以下のコマンドを実行**（YOUR-USERNAME をあなたの GitHub ユーザー名に置き換え）

```bash
cd /Users/hsunwenfang/Documents/jp202604/voice-copilot-extension

# リモートを追加
git remote add origin https://github.com/YOUR-USERNAME/voice-copilot-extension.git

# 初回プッシュ
git branch -M main
git push -u origin main
```

**実行例:**
```bash
git remote add origin https://github.com/john-doe/voice-copilot-extension.git
git branch -M main
git push -u origin main
```

**完了時の表示:**
```
Enumerating objects: 17, done.
Counting objects: 100% (17/17), done.
...
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'
```

---

### 📍 STEP 3: GitHub Releases で .vsix を公開（オプション）

ユーザーがワンクリックでダウンロードできるようにします

```bash
# GitHub CLI をインストール（未インストールの場合）
brew install gh

# GitHub にサインイン
gh auth login
# ブラウザで認証

# リリースを作成
cd /Users/hsunwenfang/Documents/jp202604/voice-copilot-extension
gh release create v0.0.1 voice-copilot-extension-0.0.1.vsix --title "Voice Copilot v0.0.1" --notes "Initial release"
```

**または手作業で:** GitHub > Releases > Create a new release から .vsix をアップロード

---

### 📍 STEP 4: VS Code Marketplace に公開

**Marketplace での公開は後回しでも OK**（GitHub Releases で先に配布可能）

将来的に Marketplace で公開する場合:

```bash
# Marketplace に公開（初回）
vsce create-publisher voice-copilot
# → Azure DevOps の Personal Access Token を入力

# 公開
vsce publish
```

---

## 🔄 バージョン更新時の流れ

```bash
# 1. 新機能を実装
# (コード編集)

# 2. バージョンアップ
sed -i '' 's/"version": "0.0.1"/"version": "0.0.2"/' package.json

# 3. コンパイル＆パッケージ
npm run compile
vsce package

# 4. Git にコミット＆プッシュ
git add .
git commit -m "Version 0.0.2: Add Japanese language support"
git push

# 5. Release を作成
gh release create v0.0.2 voice-copilot-extension-0.0.2.vsix

# 6. Marketplace に公開（既に登録済みの場合）
vsce publish
```

---

## 📊 現在の配布状態

| 方法 | 状態 | ステップ |
|------|------|--------|
| **GitHub Releases** | ⏳ 準備完了 | STEP 2, 3 実施 |
| **VS Code Marketplace** | ✅ 可能 | STEP 4 実施（後でもOK） |
| **ローカル配布** | ✅ 即座に可能 | `code --install-extension voice-copilot-extension-0.0.1.vsix` |

---

## 🎯 最速で公開する場合

```bash
# STEP 2 を実行（5分以内）
cd /Users/hsunwenfang/Documents/jp202604/voice-copilot-extension
git remote add origin https://github.com/YOUR-USERNAME/voice-copilot-extension.git
git push -u origin main
```

**これで完了！** GitHub で公開されました🎉

---

## 📋 チェックリスト

- [ ] GitHub アカウントを作成（未作成の場合）
- [ ] GitHub リポジトリを作成
- [ ] `git remote add` コマンドを実行
- [ ] `git push` コマンドを実行
- [ ] GitHub で確認（https://github.com/YOUR-USERNAME/voice-copilot-extension）
- [ ] （オプション）GitHub Release を作成
- [ ] （オプション）Marketplace に公開

---

## 💡 サポート

各ステップで質問がある場合:

- **Git関連**: [GitHub Help](https://docs.github.com)
- **vsce関連**: [Publishing Extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- **Azure DevOps**: [Personal Access Token](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate)

---

**準備完全完了！GitHub にプッシュして世界に公開しましょう！🚀**
