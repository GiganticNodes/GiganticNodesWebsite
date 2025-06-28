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

Tentu! Berikut adalah **penjelasan detail** beserta **skenario penggunaan Git** yang sering ditemui dalam pengembangan proyek, lengkap dengan contoh kasus dan alasan di balik setiap langkah.

---

## 1. **Setup Awal Git**

### a. Inisialisasi Repository
**Perintah:**  
```sh
git init
```
**Penjelasan:**  
Digunakan untuk membuat repository Git baru di folder lokal.  
**Skenario:**  
Kamu baru mulai proyek dari awal di komputer sendiri.

---

### b. Cek Remote Repository
**Perintah:**  
```sh
git remote -v
```
**Penjelasan:**  
Melihat daftar remote repository yang terhubung ke project lokal.  
**Skenario:**  
Kamu ingin tahu apakah project sudah terhubung ke GitHub atau belum.

---

### c. Menambah/Mengubah Remote
**Perintah:**  
```sh
git remote add origin <url-repo>
git remote set-url origin <url-repo>
```
**Penjelasan:**  
- `add`: Menambahkan remote baru bernama `origin`.
- `set-url`: Mengubah URL remote yang sudah ada.  
**Skenario:**  
- Baru clone project, atau ingin pindah ke repository GitHub yang berbeda.

---

## 2. **Menambah & Commit Perubahan**

### a. Menambah Perubahan ke Staging
**Perintah:**  
```sh
git add .
```
**Penjelasan:**  
Menambahkan semua perubahan file ke staging area (siap di-commit).  
**Skenario:**  
Setelah mengedit/membuat file baru dan ingin menyimpan perubahan ke riwayat git.

---

### b. Membuat Commit
**Perintah:**  
```sh
git commit -m "pesan commit"
```
**Penjelasan:**  
Menyimpan snapshot perubahan ke riwayat git dengan pesan deskriptif.  
**Skenario:**  
Setelah selesai mengerjakan satu fitur/bugfix, commit agar perubahan tercatat.

---

## 3. **Melihat Riwayat Commit**
**Perintah:**  
```sh
git log --oneline
```
**Penjelasan:**  
Melihat daftar commit secara ringkas.  
**Skenario:**  
Ingin tahu perubahan apa saja yang sudah dilakukan di project.

---

## 4. **Sinkronisasi dengan Remote**

### a. Menarik Perubahan Terbaru (Merge)
**Perintah:**  
```sh
git pull origin main
```
**Penjelasan:**  
Mengambil perubahan terbaru dari remote dan menggabungkannya ke branch lokal.  
**Skenario:**  
Sebelum mulai kerja, pastikan branch lokal update dengan remote.

---

### b. Menarik Perubahan Terbaru (Rebase)
**Perintah:**  
```sh
git pull --rebase origin main
```
**Penjelasan:**  
Mengambil perubahan terbaru dari remote, lalu menempatkan commit lokal di atas commit remote (riwayat lebih rapi).  
**Skenario:**  
Agar riwayat commit tidak bercabang, terutama saat kolaborasi.

---

## 5. **Mengirim Perubahan ke Remote**

### a. Push ke Remote
**Perintah:**  
```sh
git push origin main
```
**Penjelasan:**  
Mengirim commit lokal ke branch `main` di remote (GitHub).  
**Skenario:**  
Setelah commit, ingin membagikan perubahan ke tim atau backup di GitHub.

---

## 6. **Membuat dan Berpindah Branch**

### a. Membuat Branch Baru
**Perintah:**  
```sh
git checkout -b nama-branch
```
**Penjelasan:**  
Membuat branch baru dan langsung berpindah ke branch tersebut.  
**Skenario:**  
Mau mengerjakan fitur/bugfix tanpa mengganggu branch utama.

---

### b. Berpindah ke Branch Lain
**Perintah:**  
```sh
git checkout nama-branch
```
**Penjelasan:**  
Pindah ke branch lain yang sudah ada.  
**Skenario:**  
Ingin melanjutkan pekerjaan di branch lain.

---

## 7. **Merge Branch**

### a. Merge ke Main
**Perintah:**  
```sh
git checkout main
git merge nama-branch
```
**Penjelasan:**  
Menggabungkan perubahan dari branch lain ke branch utama (`main`).  
**Skenario:**  
Fitur/bugfix sudah selesai di branch terpisah, ingin digabung ke main.

---

## 8. **Rebase Branch**

### a. Rebase ke Main
**Perintah:**  
```sh
git checkout nama-branch
git rebase main
```
**Penjelasan:**  
Menempatkan commit branch saat ini di atas commit branch main (riwayat lebih linear).  
**Skenario:**  
Sebelum merge ke main, ingin memastikan branch up-to-date.

---

## 9. **Mengatasi Konflik**

**Skenario:**  
Saat pull, merge, atau rebase, kadang ada file yang diubah di dua tempat berbeda (konflik).

**Langkah:**
1. Buka file yang konflik, perbaiki bagian yang bertanda `<<<<<<<`, `=======`, `>>>>>>>`.
2. Setelah selesai:
   ```sh
   git add <file-yang-sudah-diperbaiki>
   ```
3. Jika rebase:
   ```sh
   git rebase --continue
   ```
4. Jika merge:
   ```sh
   git commit
   ```

---

## 10. **Membatalkan Perubahan**

### a. Membatalkan Perubahan di Working Directory
**Perintah:**  
```sh
git checkout -- path/to/file
```
**Penjelasan:**  
Mengembalikan file ke kondisi commit terakhir.  
**Skenario:**  
Salah edit file, ingin kembalikan ke versi sebelumnya.

---

### b. Membatalkan Perubahan di Staging
**Perintah:**  
```sh
git reset HEAD path/to/file
```
**Penjelasan:**  
Menghapus file dari staging area, tapi perubahan tetap ada di working directory.  
**Skenario:**  
Salah menambahkan file ke staging.

---

### c. Membatalkan Commit Terakhir (belum di-push)
**Perintah:**  
```sh
git reset --soft HEAD~1
```
**Penjelasan:**  
Menghapus commit terakhir, tapi perubahan tetap di staging.  
**Skenario:**  
Salah commit pesan atau file, ingin perbaiki sebelum push.

---

## 11. **Menghapus Branch**

### a. Lokal
**Perintah:**  
```sh
git branch -d nama-branch
```
**Penjelasan:**  
Menghapus branch lokal yang sudah tidak dipakai.  
**Skenario:**  
Branch sudah di-merge ke main.

### b. Remote
**Perintah:**  
```sh
git push origin --delete nama-branch
```
**Penjelasan:**  
Menghapus branch di remote (GitHub).  
**Skenario:**  
Branch feature sudah selesai dan tidak diperlukan lagi di remote.

---

## 12. **Troubleshooting Umum**

### a. Error: "non-fast-forward"
**Skenario:**  
Branch lokal tertinggal dari remote, push ditolak.

**Solusi:**  
```sh
git pull --rebase origin main
git push origin main
```

---

### b. Error: "fatal: No rebase in progress?"
**Skenario:**  
Menjalankan `git rebase --continue` padahal tidak ada rebase aktif.

**Solusi:**  
Abaikan, lanjutkan workflow.

---

### c. Melihat Perbedaan (Diff)
**Perintah:**  
```sh
git diff
```
**Penjelasan:**  
Melihat perubahan yang belum di-commit.  
**Skenario:**  
Cek detail perubahan sebelum commit.

---

## 13. **Workflow Kolaborasi (Best Practice)**

**Skenario:**  
Bekerja dalam tim, setiap fitur/bugfix dikerjakan di branch terpisah.

**Langkah:**
1. Update branch main:
   ```sh
   git pull --rebase origin main
   ```
2. Buat branch baru:
   ```sh
   git checkout -b fitur-baru
   ```
3. Kerjakan perubahan, commit:
   ```sh
   git add .
   git commit -m "feat: deskripsi fitur"
   ```
4. Push branch ke remote:
   ```sh
   git push origin fitur-baru
   ```
5. Buat Pull Request di GitHub, review, merge ke main.

---

## 14. **Tips Penting**

- Selalu `git pull --rebase` sebelum mulai kerja.
- Commit sering dengan pesan jelas.
- Kerjakan fitur/bugfix di branch terpisah.
- Sering cek `git status` dan `git log`.
- Selesaikan konflik segera jika muncul.

---

**Penutup:**  
Dengan memahami skenario di atas, kamu bisa mengelola project dengan Git secara profesional, baik sendiri maupun dalam tim.  
Jika ada kasus spesifik, error, atau ingin simulasi workflow lain, silakan tanya lagi!