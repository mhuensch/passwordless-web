let config =
  { chainWebpack: config => { 
       config
         .entry("app")
         .clear()
         .add("./src/app.js")
         .end()
     }
  , publicPath: ''
  , devServer: 
    { public: 'mhuensch.local:8080' 
    , compress: true
    , disableHostCheck: true
    }
  }

module.exports = config