# Tutorial Commit & Push Ulang Seluruh Kode dengan Git

Tutorial ini menjelaskan langkah-langkah melakukan commit ulang seluruh kode dan mendorongnya ke repository GitHub menggunakan Git.

---

## 1. Konfigurasi User Git (Opsional)

Jika ingin mengubah identitas user untuk commit:

```sh
git config user.name "GiganticNodes"
git config user.email "labsgigantic@gmail.com"
```

---

## 2. Menambahkan Semua Perubahan ke Staging Area

```sh
git add .
```
**Penjelasan:**  
Perintah ini akan menambahkan semua file yang telah diubah, ditambah, atau dihapus ke staging area. Semua perubahan siap untuk di-commit.

---

## 3. Membuat Commit Baru

```sh
git commit -m "chore: commit ulang seluruh kode dengan konfigurasi user baru"
```
**Penjelasan:**  
Membuat commit baru dengan pesan yang menjelaskan perubahan. Semua perubahan di staging area akan dicatat ke dalam riwayat git.

---

## 4. Mengirim (Push) Commit ke Repository GitHub

```sh
git push origin main
```
**Penjelasan:**  
Mengirim commit terbaru dari branch `main` di lokal ke branch `main` di repository GitHub.

---

## Ringkasan Urutan Command

```sh
git config user.name "GiganticNodes"
git config user.email "labsgigantic@gmail.com"
git add .
git commit -m "chore: commit ulang seluruh kode dengan konfigurasi user baru"
git push origin main
```

---

## Catatan

- Pastikan sudah melakukan `git init` dan sudah terhubung ke remote repository (`git remote add origin <url>`) jika baru pertama kali.
- Jika branch yang digunakan bukan `main`, ganti `main` dengan nama branch yang sesuai.

---

**Selesai!**  
Seluruh kode Anda sudah berhasil di-commit ulang dan dikirim ke repository GitHub.


Jika Anda ingin membuat blog baru (misal menambah file di folder `app/blog/`), berikut langkah-langkah commit-nya:

---

### 1. **Tambahkan File Blog Baru**
Misal Anda membuat file baru:  
`app/blog/blog-baru-saya.tsx`

---

### 2. **Cek Status Perubahan**
```sh
git status
```
**Penjelasan:**  
Melihat file apa saja yang baru, diubah, atau dihapus.

---

### 3. **Menambahkan File ke Staging Area**
Ada dua cara:

#### a. Menambahkan Semua Perubahan
```sh
git add .
```
**Penjelasan:**  
Semua file baru, perubahan, dan penghapusan akan masuk ke staging area.

#### b. Menambahkan File Tertentu Saja
```sh
git add app/blog/blog-baru-saya.tsx
```
**Penjelasan:**  
Hanya file blog baru yang ditambahkan ke staging area.

---

### 4. **Commit Perubahan**
```sh
git commit -m "feat: tambah blog baru tentang [judul/topik]"
```
**Penjelasan:**  
Membuat commit dengan pesan yang menjelaskan penambahan blog baru.

---

### 5. **Push ke Repository**
```sh
git push origin main
```
**Penjelasan:**  
Mengirim commit ke repository GitHub.

---

## **Kesimpulan**
- **Boleh** menggunakan `git add .` jika Anda yakin hanya file yang diinginkan yang berubah/ditambah.
- **Lebih aman** gunakan `git add <nama_file>` jika hanya ingin commit file tertentu saja (misal hanya blog baru).

---

**Tips:**  
Selalu cek dengan `git status` sebelum commit agar tahu file mana saja yang akan ikut di-commit.

Jika ingin tutorial dalam format .md atau ada pertanyaan lain, silakan minta!

Sebenarnya, **boleh saja** menggunakan `git add .` untuk menambahkan semua perubahan (file baru, file yang diubah, file yang dihapus) ke staging area sebelum commit.  
Namun, ada beberapa pertimbangan kenapa kadang **tidak disarankan** menggunakan `git add .` secara sembarangan, terutama pada proyek yang besar atau dikerjakan tim.

---

## Penjelasan

### Kapan **Boleh** Menggunakan `git add .`?
- Jika Anda **yakin** semua perubahan di folder kerja memang ingin di-commit.
- Proyek masih kecil atau Anda bekerja sendiri.
- Tidak ada file sensitif/sementara yang tidak ingin di-commit.

### Kapan **Sebaiknya Tidak** Menggunakan `git add .`?
- Jika ada file lain yang **tidak ingin di-commit** (misal: file konfigurasi lokal, file debug, file sementara).
- Anda hanya ingin commit **perubahan tertentu saja** (misal: hanya file blog baru, bukan file lain yang ikut berubah).
- Bekerja dalam tim, agar commit lebih terkontrol dan tidak ada file yang tidak sengaja ikut ter-commit.

---

## Contoh Risiko `git add .`
Misal Anda:
- Membuat blog baru (`app/blog/blog-baru.tsx`)
- Tapi juga mengedit file lain untuk testing (`test.md`)

Jika Anda menjalankan:
```sh
git add .
```
Maka **semua** perubahan, termasuk `test.md`, akan ikut di-commit, padahal mungkin Anda hanya ingin commit blog baru saja.

---

## **Kesimpulan**
- `git add .` = menambahkan **semua** perubahan (baik yang diinginkan maupun tidak).
- `git add <nama_file>` = menambahkan **hanya file tertentu** yang ingin di-commit.

**Gunakan `git add .` jika yakin semua perubahan memang ingin di-commit.  
Jika ingin commit lebih selektif, gunakan `git add <nama_file>` agar lebih aman dan terkontrol.**

---

Jika ingin penjelasan ini dalam format .md, silakan minta!