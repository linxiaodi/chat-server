## 聊天室后端

### 目录结构
```
   |-- routers
          |-- user
   |-- middlewares
            |-- auth // 鉴权
   |-- models
          |-- user
                |-- schema
                |-- models
                |-- service
                |-- index // 接口： export { Service, Models }
```

### 通讯机制：json_web_token

### 错误处理
```
code:
2000: resolve OK
4006: 用户未登录
4008: 登录过期
```