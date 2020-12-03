# webpack的编译流程
  - 初始化参数：从配置文件和Shell语句中读取与合并参数，得到最终的参数
  - 开始编译：用上一步得到的参数初始化Compiler对象，
            加载所有配置插件，执行对象的run方法开始执行编译
  - 确定入口：根据配置中的entry找出所有的入口文件
  - 编译模块： 从入口文件出发，调用所有的配置的Loader对模块进行编译
             在找出该模块依赖的模块，在递归本步骤直到所有入口依赖的文件都进过本步骤的处理
  - 完成模块编译： 经过上面步骤用Loader编译完所有模块后，得到每个模块被翻译后最终内容以及它们之间的依赖关系
  - 输出资源： 根据入口和模块之间的依赖关系，组装成一个个包含多个模块的Chunk,再把每个Chunk转换成一个单独的文件加入到输出列表
  - 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
  
  在以上过程在，webpack会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用Webpack提供的API改变Webpack运行的结果



# webpack中source有哪几种常用的模式有什么区别？
  - devtool: source-map // 增加映射文件帮我调试代码
  - devtool: eval-source-map // 不会产生单独的文件，但是会显示行和列
  - devtool: cheap-module-source-map // 不会产生列，但是是一个单独的映射文件，产生后你可以保留起来
  - devtool: cheap-module-eval-source-map // 不会产生文件，集成在打包后的文件中，不会产生列
  
# watch模式
  - 怎么产生的：
  - watch: true
  - watchOptions: { // 监控的选项
    poll:1000, // 每秒问我多少次
    aggreatementTimeOut: 500, // 防抖
    ignord: /node_modules/
  }


# resolve属性 
 - resolve: {// 解析 第三方包
    modules: [path.resolve('node_modules'),path.resolve('dist')],
    extensions:['.js','.css','.json'],
    mainFields:['style','main'],
    mainFiles:,
    alias:{
      bootstrap: 'bootstrap/dist/css/bootstrap.css'
    }
 }

# 环境变量webpack自带插件 webpack.DefinePlugin
 - new webpack.DefinePlugin({
   DEV:JSON.stringfy('production')
  }) 

# 区分开发环境和生产环境
  - webpack-merge plugin
  - let {smart} = require('webpack-merge')
    let base = require('./webpack.base.js') 
    moudule.exports = smart(base,{
    })

