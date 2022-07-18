# Bookshelf API

Bookshelf API for Submission in Learn to Make Back-End Apps for Beginners from Dicoding

## Read to know

- [How to run](#run-locally)
- [API Reference](#api-reference)
- [Tech Stack](#tech-stack)

## Run Locally

Clone the project

```bash
  git clone https://github.com/juniorimam/bookshelf-api
```

Go to the project directory

```bash
  cd bookshelf-api
```

Install dependencies

```bash
  npm install or npm i
```

Start the server

```bash
  npm run start
```

## API Reference

### Create a new book

`POST /books`

```
curl --location --request POST 'http://localhost:5000/books' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "${name}",
    "year": ${year},
    "author": "${author}",
    "summary": "${summary}",
    "publisher": "${publisher}",
    "pageCount": ${pageCount},
    "readPage": ${readPage},
    "reading": ${reading}
}'
```

| Parameter   | Type      | Description                              |
| :---------- | :-------- | :--------------------------------------- |
| `name`      | `string`  | **Required**. Books name                 |
| `year`      | `number`  | **Required**. Books year                 |
| `author`    | `string`  | **Required**. Books author               |
| `summary`   | `string`  | **Required**. Books summary              |
| `publisher` | `string`  | **Required**. Books publisher            |
| `pageCount` | `number`  | **Required**. Total books page           |
| `readPage`  | `number`  | **Required**. Total readed page of books |
| `reading`   | `boolean` | **Required**. Is it being read or not    |

### Get all books

`GET /books`

```
curl --location --request GET 'http://localhost:5000/books'
```

### Get specific book data

`GET /books/${id}`

```
curl --location --request GET 'http://localhost:5000/${id}'
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of books to fetch |

### Get All Books by Reading Status

`GET /books?reading=`

```
curl --location --request GET 'http://localhost:5000?reading='
```

| Parameter | Type     | Description                                                       |
| :-------- | :------- | :---------------------------------------------------------------- |
| `reading` | `number` | **Required**. Books reading status. Type 0 as false, or 1 as true |

### Get All Books by Finished Status

`GET /books?finished=`

```
curl --location --request GET 'http://localhost:5000?finished='
```

| Parameter  | Type     | Description                                                        |
| :--------- | :------- | :----------------------------------------------------------------- |
| `finished` | `number` | **Required**. Books finished status. Type 0 as false, or 1 as true |

### Change books data

`PUT /books/${id}`

```
curl --location --request PUT 'http://localhost:5000/books/${id}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "${name}",
    "year": ${year},
    "author": "${author}",
    "summary": "${summary}",
    "publisher": "${publisher}",
    "pageCount": ${pageCount},
    "readPage": ${readPage},
    "reading": ${reading}
}'
```

| Parameter   | Type      | Description                              |
| :---------- | :-------- | :--------------------------------------- |
| `id`        | `string`  | **Required**. Id of books to fetch       |
| `name`      | `string`  | **Required**. Books name                 |
| `year`      | `number`  | **Required**. Books year                 |
| `author`    | `string`  | **Required**. Books author               |
| `summary`   | `string`  | **Required**. Books summary              |
| `publisher` | `string`  | **Required**. Books publisher            |
| `pageCount` | `number`  | **Required**. Total books page           |
| `readPage`  | `number`  | **Required**. Total readed page of books |
| `reading`   | `boolean` | **Required**. is it being read or not    |

### Delete a books

`DELETE /books/${id}`

```
curl --location --request DELETE 'http://localhost:5000/${id}'
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of books to fetch |

## Tech Stack

**Server:** NodeJS

## Authors

This project was created by [@juniorimam](https://www.github.com/juniorimam)
