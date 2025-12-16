# MODUL33 - JS + SCSS + Express + PostgreSQL örnek proje

Kısa: Basit CRUD örneği — frontend (HTML/JS/SCSS) ve backend (Express + PostgreSQL).

Kurulum
1. Kopyala `.env.example` → `.env` ve `DATABASE_URL` veya `PG_CONNECTION` değerini güncelleyin.
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

Local (DB yoksa) fallback
- Proje, Postgres bağlanamazsa otomatik olarak bellek içi (in-memory) fallback moduna geçer ve örnek veriler döner.

Kısa kullanım komutları
- Sunucuyu arka planda başlatıp logları takip etmek:
```bash
# arka planda başlat
nohup npm start > /tmp/ege_server.log 2>&1 & echo $! > /tmp/ege_server.pid

# logları izlemek
tail -f /tmp/ege_server.log
```

- Basit API testleri:
```bash
curl http://localhost:3000/api/items
curl -X POST http://localhost:3000/api/items -H "Content-Type: application/json" -d '{"title":"Deneme","description":"açıklama"}'
```

Notlar
- `PG_CONNECTION` ortam değişkeninin formatı: `postgresql://user:pass@host:port/dbname`
- Eğer `psql` veya `createdb` komutları yoksa, lokal PostgreSQL kurulumuna uygun adımları takip edin.
