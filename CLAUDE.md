# BE-book-finder — Context for Claude

## Project Overview

REST API backend untuk menyimpan buku favorit. Dibangun dengan Express.js + PostgreSQL.

## Tech Stack

- **Runtime:** Node.js (CommonJS, bukan ESM)
- **Framework:** Express.js
- **Database:** PostgreSQL via `pg` (connection pool)
- **Env:** dotenv

## Struktur File

```
app.js                        # Entry point, Express setup, port dari .env
src/
  config/postgre.js           # Pool koneksi DB — baca dari .env
  model/book.js               # Raw SQL queries (5 fungsi)
  controller/book.js          # Request/response handler
  router/book.js              # Route definitions
  router/router.js            # Mount /book router
  middleware/response.js      # Format JSON response standar
  db/migrate.js               # Migration script — jalankan npm run migrate
```

## Database

### Ganti DB
1. Edit `.env` — ubah `DB_HOST`, `DB_USER`, `DB_DATABASE`, `DB_PASSWORD`, `DB_PORT`
2. Jalankan `npm run migrate`

### Schema

```sql
CREATE TABLE IF NOT EXISTS "favorite" (
    id      VARCHAR PRIMARY KEY,
    title   VARCHAR NOT NULL,
    author  VARCHAR,
    image   VARCHAR
)
```

### .env format

```
DB_USER=
DB_HOST=
DB_DATABASE=
DB_PASSWORD=
DB_PORT=5432
PORT=4000
```

## API Endpoints

| Method | Path       | Handler               | Deskripsi             |
|--------|------------|-----------------------|-----------------------|
| GET    | /book      | bookController.getBook       | Ambil semua favorit   |
| POST   | /book      | bookController.postFavorite  | Tambah buku favorit   |
| DELETE | /book/:id  | bookController.deleteFavorite| Hapus buku favorit    |

## NPM Scripts

| Script            | Perintah                  |
|-------------------|---------------------------|
| `npm start`       | Jalankan server           |
| `npm run nodemon` | Jalankan dengan auto-reload|
| `npm run migrate` | Buat/update schema DB     |

## Hal yang Perlu Diperhatikan

- Model menggunakan string interpolation SQL (rentan SQL injection) — belum dipakai parameterized query
- `app.js` port hardcoded ke 4000, belum baca `process.env.PORT`
- Controller `deleteFavorite` mengakses `result.data.rowCount` — kemungkinan bug, harusnya `result.rowCount`
- Ada kode yang di-comment di `postFavorite` (logika cek duplikat buku)
