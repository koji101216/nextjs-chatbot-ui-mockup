# nextjs-chatbot-ui-mockup


Chatbot UI Mockupは、Next.js、TypeScript、Material-UIを使用して構築された、モダンでリッチなチャットインターフェースのモックアップです。

## 機能

- リアルタイムチャット機能
- レスポンシブデザイン
- ダークモード対応
- ユーザー認証
- 会話履歴
- 設定ページ

## 必要条件

- Node.js (v14以上)
- Yarn

## インストール

1. リポジトリをクローンします：

```bash
git clone https://github.com/koji101216/nextjs-chatbot-ui-mockup.git
cd nextjs-chatbot-ui-mockup
```

2. 依存関係をインストールします：

```bash
yarn install
```

## 開発サーバーの起動

開発サーバーを起動するには、以下のコマンドを実行します：

```bash
yarn dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認できます。

## ビルドと本番環境での実行

本番用にアプリケーションをビルドするには、以下のコマンドを実行します：

```bash
yarn build
```

ビルドしたアプリケーションを実行するには：

```bash
yarn start
```

## テスト

テストを実行するには：

```bash
yarn test
```

## デプロイメント

このプロジェクトはVercelにデプロイされています。

デモ: [Chat UI MockUp](https://nextjs-chatbot-ui-mockup.vercel.app/)

### Vercelへのデプロイ方法

1. [Vercel](https://vercel.com/)でアカウントを作成します。
2. このリポジトリをGitHubにプッシュします。
3. Vercelダッシュボードで「New Project」をクリックします。
4. GitHubリポジトリを選択し、「Import」をクリックします。
5. 必要に応じて環境変数を設定します。
6. 「Deploy」をクリックしてデプロイを開始します。

詳細な手順については、[Next.jsのデプロイメントドキュメント](https://nextjs.org/docs/deployment)を参照してください。

## 技術スタック

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/)

## 貢献

プルリクエストは歓迎します。大きな変更を加える場合は、まずissueを開いて変更内容について議論してください。

## 作者

Koji Sonoda - [@koji101216](https://github.com/koji101216)
