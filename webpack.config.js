const path=require("path")
const webpack = require('webpack');
const VueLoaderPlugin = require(path.join(__dirname,'node_modules/vue-loader/lib/plugin'))
const ExtractTextPlugin=require("extract-text-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin') 
const CompressionPlugin = require('compression-webpack-plugin')

module.exports={
  entry: path.join(__dirname,"/src/master.js"),

  output:{
      path:path.join(__dirname,"/public"),
      filename:"master.js"
  },
  resolve:{
    alias:{
        vue$:path.join(__dirname,"/node_modules/vue/dist/vue.js")
    }
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        loader:'vue-loader'
      },
      {
        test:/\.js$/,exclude: /node_modules/,loader:'babel-loader'
      },{
        test:/\.css$/,
        use:ExtractTextPlugin.extract({
          fallback: "vue-style-loader",
          use: "css-loader"
        })

      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader'
      },
    ]
  },

  plugins:[
    new VueLoaderPlugin(),
    new ExtractTextPlugin("master.css"),
    new UglifyJsPlugin({
      parallel: 4,
      uglifyOptions: {
          output: {
              comments: false,
              beautify: false,
          }, 
      },
      sourceMap:false,
      cache: true,
  }),
  new CompressionPlugin({
    // asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp(
      '\\.(js)$' 
    ),
    threshold: 10240,
    minRatio: 0.8}),
  new webpack.DefinePlugin({
      "process.env":{
        NODE_ENV:JSON.stringify('production')
       }
    })
],
  mode: 'development',
  devServer:{
    port:81,
		host:'0.0.0.0',
		disableHostCheck: true,
		contentBase:path.join(__dirname,"/views"), //热重载模式下根文件
		hot:true
  }
}