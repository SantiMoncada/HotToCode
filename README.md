# HotToCode-Server
 The server for the application HotToCode developed by Santiago Moncada & Jorge Hermo

User routes

| METHOD | ENDPOINT                         | RESPONSE                         | ACTION                |
|--------|----------------------------------|----------------------------------|-----------------------|
| GET    | api/users                        | [users]                          | get all users info    |
| GET    | api/users/details/user_id        | {user}                           | get one user info     |
| POST   | api/users/update                 | {mesage: user edited}            | edit a user           |
| POST   | api/:snippet_id/favSnippet       | {message: snippet marked as fav} | mark a snippet as fav |

Snippets routes

| METHOD | ENDPOINT                         | RESPONSE                         | ACTION                |
|--------|----------------------------------|----------------------------------|-----------------------|
| GET    | api/snippets/create              | [snippets]                       |                       |
| POST   | api/snippets/create              | {message: New snipped created}   | create snippet        |
| GET    | api/snippets/list                | [snippets]                       | get all snippets      |
| GET    | api/snippets/:sinppet_id/details | {snippet}                        | get all users snippet |
| GET    | api/snippets/:sinppet_id/edit    | {snippet}                        | get snippet           |
| POST   | api/snippets/:snippet_id/edit    | {message: snippet edited}        | edit snippet          |
| POST   | api/snippets/:snippet_id/delete  | {message: snippet deleted}       | delete snippet        |

Comments routes

| METHOD | ENDPOINT                         | RESPONSE                         | ACTION                |
|--------|----------------------------------|----------------------------------|-----------------------|
| POST   | api/comment/:comment_id          | {meesage: comment}               | post a cooment        |