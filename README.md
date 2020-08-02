# Getting Started

まだ開発段階であるので、起動には `yarn` パッケージが必要となります。

必要モジュールのインストール

```sh
$ yarn
```

ローカルサーバーの起動

```sh
$ yarn start
```

アプリケーションの起動

```sh
$ yarn electron
```

# Build

パッケージ化

```sh
$ yarn build
$ yarn package-linux
```

Debian パッケージ作成

```sh
$ electron-installer-debian --src release-builds/create-react-app-linux-x64/ --arch amd64 --config debian.json
```
