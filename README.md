# My Drive

## project

- firebase
- google-drive

## firebase rule

- 结构

```js
service cloud.firestore {
  match /databases/{database}/documents { //這裡指的是我們的整個firestore最大的document，我們不需要修改他
    match /{document=**} {  // 下面是就符合所有的document我們都給他可讀寫
      allow read, write;
    }
  }
}


```

- 修改
  - read: get/list
  - write: craete/update/delete
- 简单验证登录

```js
allow read,write: if request.auth.uid != null
```

- 目标资料验证（内容验证）

```js
allow update: if resource.data.content === abc;
allow delete: if request.auth.uid != null;
```

- 接收资料的验证

```js
allow create: if request.resource.data.content == 'new content'

```

- 自定义条件

```js

function isAuthWidthData() {
  return request.auth.uid != null &&
  get(/databases/${datatabase}/documents/users/${request.auth.uid}).data.uid == request.auth.uid
}

match /**/ {

  allow delete: if isAuthWithData()
}


```
