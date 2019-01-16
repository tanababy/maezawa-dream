
// 'production' か 'development' を指定
const webpack = require('webpack');
const MODE = 'production';

module.exports = {
  context: __dirname,
  cache: true,

  mode: MODE,
  // メインとなるJavaScriptファイル（エントリーポイント）
  entry: {
    script: "./src/js/index.js"
    //   script: ["@babel/polyfill", "./src/js/index.js"]
  },
  // ファイルの出力設定
  output: {
    //  出力ファイルのディレクトリ名
    path: `${__dirname}/htdocs/js`,
    // 出力ファイル名
    filename: "[name].js"
  },
  // IE11が保証対象外の場合は、下記コメントアウトを有効にし、外部ライブラリはエントリーポイントのjsにimportで記述する。
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       // 今回はvendorだが、任意の名前で問題ない
  //       vendor: {
  //         // node_modules配下のモジュールをバンドル対象とする
  //         test: /node_modules/,
  //         name: "vendor",
  //         // chunks: 'initial',
  //         chunks: "initial",
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  module: {
    rules: [
      {
        // 拡張子 .js の場合
        test: /\.js$/,
        exclude: /(node_modules)/,
        // include: [
        //   srcPath,
        //   path.resolve(__dirname, 'node_modules/gsap'),
        // ],
        use: [
          {
            // Babel を利用する
            loader: "babel-loader",
            // Babel のオプションを指定する
            options: {
              "presets": [
                ["@babel/preset-env", {
                  "useBuiltIns": false,
                }],
              ],
              "plugins": [
                "@babel/plugin-transform-runtime",
              ]
            }
          }
        ]
      }
    ]
  },
  // splitChunksを使用する場合は、こちらも有効にする
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     $: "jquery"
  //   })
  // ]
};