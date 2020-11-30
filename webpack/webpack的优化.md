# 引用别的模块 例如jquery
  - noParse: /jquery/, 不去解析jquery中的依赖库
  - exclude:
  - include:

# webpack.IgnorePlugin(/\.\/)

# webpack.DllPlugin  动态链接库
  - webpack内置的  预先打包框架等
  - 引用动态链接库 webpack.DLlReferencePlugin


# happypack 使用多线程打包
  - 注意分配线程也是需要耗费时间的，小的打包反而可能快一点