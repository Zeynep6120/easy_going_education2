# MODUL33 - JS + SCSS + Express + PostgreSQL örnek proje

Kısa: Basit CRUD örneği — frontend (HTML/JS/SCSS) ve backend (Express + PostgreSQL).

Kurulum
1. Kopyala `.env.example` → `.env` ve `PG_CONNECTION` değerini güncelleyin.
2. Bağımlılıkları yükleyin:

```bash
cd /Users/zeynepozmen/Downloads/MODUL33
npm install
```

3. Veritabanını oluşturun ve şemayı çalıştırın (örnek):

```bash
# PostgreSQL'de bir veritabanı oluşturun (ör: modul33db)
createdb modul33db
# Ardından SQL dosyasını çalıştırın
psql modul33db -f db/init.sql
```

4. SCSS derlemesi (geliştirme için izleme):

```bash
npm run build-sass # tek seferlik derleme
npm run watch-sass # geliştirme esnasında izleme
```

5. Uygulamayı çalıştırın:

```bash
npm run dev   # nodemon ile geliştirme
# veya
npm start     # üretim (ilk önce build-sass çalıştırın)
```

API
- `GET /api/items` — öğe listesini alır
- `POST /api/items` — { title, description } ile yeni öğe ekler
- `DELETE /api/items/:id` — öğe siler

Notlar
- `PG_CONNECTION` ortam değişkeninin formatı: `postgresql://user:pass@host:port/dbname`
- Eğer `psql` veya `createdb` komutları yoksa, lokal PostgreSQL kurulumuna uygun adımları takip edin.
