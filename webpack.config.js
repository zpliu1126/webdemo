var path=require("path")
const VueLoaderPlugin = require(path.join(__dirname,'node_modules/vue-loader/lib/plugin'))
module.exports={
  entry: path.join(__dirname,"/src/main.js"),

  output:{
      path:path.join(__dirname,"/public"),
      filename:"bundle.js"
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
        test:/\.js$/,loader:'babel-loader'
      },{
        test:/\.css$/,
        use:[{loader:'vue-style-loader'},{loader: 'css-loader'}]
      },
    ]
  },

  plugins:[
    new VueLoaderPlugin()
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