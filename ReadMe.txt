This is a very basic example of (`Sign In`, `Detail By Each Id`, `Calculation Credit`) in Node.js and MongoDB.

Running Locally
Make sure you have Node.js(`https://nodejs.org/en/`) and the MongoDB for 32-bit(`https://www.mongodb.org/dl/win32/i386`) and for others (`https://www.mongodb.com/download-center/community`) installed.

You're going to need to create a DB named `YesDocSchema` and import from the `MongoDB` folder.
And please create collection name `users`.
You can adjust the database configuration in `app/config/config.json`.

You can run " node server.js " from the project directory in command prompt.

You can call url(`localhost:8080`) with api-key (7jfpo39kdqwe0welrge723lrf) in req Header from your `Postman` or `Restful`.


***`Sign In` => `http://localhost:8080/user/get-user?email=justin.yesdoc123%40gmail.com` => `GET`
(I have used Firebase to login on FrontEnd. Thus I have checked that person's email is `active`. 
And I have returned some information to FrontEnd.)


***`Detail By Each Id` => `http://localhost:8080/user/get-user-data?id=5e1df59fd5b5a916104a70a9` => `GET`


***`Update` => `http://localhost:8080/user/update-credit` => `POST`
```json
{
	"id": "5e1ccc84e417b11a80b90657",
	"available_credit": 500,
	"used_credit": 50,
	"date": "2020-12-02"
}
```