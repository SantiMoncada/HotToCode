# HotToCode-Server
The server for the application HotToCode developed by Santiago Moncada & Jorge Hermo

## Auth routes

| METHOD | ENDPOINT                         | RESPONSE                         | ACTION                |
|--------|----------------------------------|----------------------------------|-----------------------|
| GET    | api/auth/signup                  | [{user}]                         |     |
| GET    | api/auth/login                   | [{user}]                         |     |
| GET    | api/auth/verify                  | [{user}]                         |     |

## User routes

| METHOD | ENDPOINT                         | RESPONSE                         | ACTION                |
|--------|----------------------------------|----------------------------------|-----------------------|
| GET    | api/users                        | [{user}]                         | get all users info    |
| GET    | api/users/details/:user_id       | {user}                           | get one user info     |
| PUT    | api/users/edit/:users_id         | {user}                           | edit a user           |
| PUT    | api/users/favSnippet/:snippet_id | {snippet}                        | mark a snippet as fav |
| PUT    | api/users/rmSnippet/:snippet_id  | {snippet}                        | del snippet from fav  |

## Snippets routes

| METHOD | ENDPOINT                         | RESPONSE                         | ACTION                |
|--------|----------------------------------|----------------------------------|-----------------------|
| GET    | api/snippets/list?user={user_id}&lang={language}&limit={quantity} | [snippet]| get all snippets|
| GET    | api/snippets/details/:sinppet_id | {snippet}                        | get snippet details   |
| POST   | api/snippets/create              | {snippet}                        | create snippet        |
| PUT    | api/snippets/edit/:snippet_id    | {snippet}                        | edit snippet          |
| DELETE | api/snippets/delete/:snippet_id  | {snippet}                        | delete snippet        |

## Comments routes

| METHOD | ENDPOINT                         | RESPONSE                         | ACTION                |
|--------|----------------------------------|----------------------------------|-----------------------|
| GET    | api/comments/:post_id            | [comment]                        | get all comments      |
| POST   | api/comments/create/:post_id     | {snippet}                        | create a comment      |
| PUT    | api/comments/edit/:post_id       | {comment}                        | edit a comment        |
| DELETE | api/comments/delete/:post_id     | {comment}                        | delete a comment      |

## Environment variables required
PORT
ORIGIN
MONGODB_URI
TOKEN_SECRET
CLOUDINARY_NAME
CLOUDINARY_KEY
CLOUDINARY_SECRET

