## GITIV8



#### List of Gitiv8 routes :

| Route                       | HTTP   | Body                                   | Response                              | Error             | Description                                           |
| --------------------------- | ------ | -------------------------------------- | ------------------------------------- | ----------------- | ----------------------------------------------------- |
| /github/myprofile           | GET    | none                                   | `Status code:200` `datatype:{object}` | `Status code:400` | See user profile details                              |
| /github/starred             | GET    | none                                   | `Status code:200` `datatype:[arr]`    | `Status code:400` | List user starred repositories                        |
| /github/starred:username    | GET    | none                                   | `Status code:200` `datatype:[arr]`    | `Status code:400` | Filter starred repositores by selected username       |
| /github/myrepos             | GET    | none                                   | `Status code:200` `datatype:[arr]`    | `Status code:400` | See authenticated user repositories                   |
| /github/repo/:username      | GET    | none                                   | `Status code:200` `datatype:[arr]`    | `Status code:400` | See repositories by other user                        |
| /github/createrepo          | POST   | `name:String`,<br>`description:String` | `Status code:201` `datatype:{object}` | `Status code:400` | Create new repository in authenticated user's account |
| /github/unstar/:owner/:repo | DELETE | None                                   | `Status code:200` `datatype:{object}` | `Status code:400` | Unstar a previously starred repository                |

#### Starting the application

###### To start server side, change directory to `server` then write the command below on your terminal:

```npm init
npm init
npm install
nodemon app.js
```

###### To start client side, change directory to `client` then write the command below on your terminal:

`live-server --host=localhost `

#### Usage

View the running application through the live-server on your browser.

