# BOOK SHELF API DOCUMENTATION

## API Spec

The preferred JSON object to be returned by the API should be structured as follows:

### How To Install and Run This Application on your Computer

1. yarn install - install dependncies
2. yarn dev - develeopment server
3. yarn run build:prod - compile code
4. yarn start

### User Features

Users can:

- signup
- Login
- Read Books

BOOK SHELF OWNER can:

```source-json
LOGIN DETAILS
{
  email: 'admin@admin.com',
  password: 'Admin@12345',
}
```

- Login
- Read Books
- archive and unarchive book
- add and edit books

### Built With

- Nodejs/Expressjs/Typescript
- SQLite Database
- Typeorm ORM

### Users (for authentication)

note: SEND A JSON PAYLOAD

```source-json
{
  "email": "jake@jake.jake",
  "password": "snsnns",
}
```

### Single Book

note: SEND A MULTI PART-FORM DATA

---

CATEGORIES ACCEPTED - ['comic','fantasy,'action','thriller','comtemporary']

```source-json
{
  "title": "test",
  "author": "test",
  "category": "CATEGORY",
  "description": "test",
  "publication_date": "2016-02-18",
  "archived": false,
  "bookImage": "jpeg, png images"
}
```

### Errors and Status Codes

If a request fails any validations, expect errors in the following format:

```source-json
{
  success: boolean;
  status: number;
  data?: { book?: any, user? };
  error?: string;
  message?: string | null
}
```

### Other status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request

## Endpoints:

### Authentication:

`POST /auth/login`

Example request body:

```source-json
{
  "email": "jake@jake.jake",
  "password": "jakejake"
}
```

No authentication required, returns a User, jwt token

Required fields: `email`, `password`

### Registration:

`POST /auth/signup`

Example request body:

```source-json
{
  "email": "jake@jake.jake",
  "password": "jakejake"
}
```

No authentication required, returns a User, jwt payload

Required fields: `email`, `password`

### Create Book

`POST /book/add`

Example request body:

```source-json
{
  "title": "test",
  "author": "test",
  "category": "CATEGORY",
  "description": "test",
  "publication_date": "2016-02-18",
  "archived": false,
  "bookImage": "jpeg, png images"
}
```

Authentication required (OWNER ONLY), will return an Article

Required fields: `title`, `description`, `body`

### Update Book

`PUT /api/book/edit/:title`

Example request body:

```source-json
{
  "author": "test",
  "category": "CATEGORY",
  "description": "test",
  "publication_date": "2016-02-18",
  "archived": false,
  "bookImage": "jpeg, png images"
}
```

Authentication required (OWNER ONLY), returns the updated Book

### Archive Book

`POST /api/book/archive`
Example request body:

```source-json
{
  "author": "title of book being archived",
  "archived": false | true,
}
```

### List Books (Users)

`GET /api/book`

RETURNS - 3 array of books in varoius category

Example response body:

```source-json
{
  [
    {
      "category": "CATEGORIES",
      "books": [{BOOKS}]
    }
  ]
}
```

### List Books (OWNER)

`GET /api/book/admin`

RETURNS - array of books

Example response body:

```source-json
{
  [
    "title": "test",
  "author": "test",
  "category": "CATEGORY",
  "description": "test",
  "publication_date": "2016-02-18",
  "archived": false,
  "bookImage": "jpeg, png images"
  ]
}
```

### Authors

This app was created charles
