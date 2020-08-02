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
$ rm -r Picking-React-*
$ electron-packager . Picking-React --platform=linux --arch=x64 --electronVersion=3.0.9 --executableName picking-react
```

Debian パッケージ作成

```sh
$ electron-installer-debian --src Picking-React-linux-x64/ --arch amd64 --config debian.json
```
