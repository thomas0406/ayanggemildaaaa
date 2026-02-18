# 🚀 QUICK START - LOCAL TESTING

Sebelum deploy ke GitHub Pages, test dulu di PC/HP lokal Anda!

---

## ✅ TEST LOKAL (Tanpa Deploy)

### Windows/Mac/Linux - Buka di Browser

**Opsi 1: Langsung Buka File**
```
1. Buka folder: d:\DIARY WEB
2. Double-click: setup.html (atau drag ke browser)
3. Atau: index.html
```

✅ Aplikasi siap pakai!

---

### HP - Test dari HP yang sama

**Via USB / WiFi:**
1. Hubungkan PC dan HP ke wifi yang sama
2. Di PC, ketik `ipconfig` di PowerShell
3. Cari IP address PC (misal: `192.168.1.100`)
4. Di HP, buka browser:
   ```
   http://192.168.1.100:8000
   ```
   (atau pakai local server, lihat di bawah)

---

## 🖥️ LOCAL WEB SERVER (Recommended)

Untuk test lebih realistis seperti di GitHub Pages:

### Python (Paling Mudah)

```bash
# Buka PowerShell
# Navigate ke folder
cd "d:\DIARY WEB"

# Start server
python -m http.server 8000

# Buka browser
# http://localhost:8000
```

✅ Server running!

**Ctrl+C untuk stop**

---

### Node.js (Jika sudah install)

```bash
# Install global (1x saja)
npm install -g http-server

# Buka folder
cd "d:\DIARY WEB"

# Start server
http-server

# Buka browser
# http://localhost:8080
```

---

## 📱 TEST CHECKLIST

Saat local testing, check ini:

- [ ] **Setup Page**
  - [ ] Input "Diary ID" dan password
  - [ ] Klik "BUAT DIARY BARU"
  - [ ] Sharing link appear di bawah
  - [ ] Copy link works

- [ ] **Admin Panel**
  - [ ] Upload 2 foto + deskripsi
  - [ ] Foto appear di preview ✅
  - [ ] Klik SIMPAN
  - [ ] Entri muncul di "📚 Entri Anda"
  - [ ] Foto visible dengan thumbnail

- [ ] **Public Page**
  - [ ] Klik sharing link
  - [ ] Entri + foto visible
  - [ ] Klik foto → modal zoom bekerja
  - [ ] Description muncul dengan benar

- [ ] **Mobile**
  - [ ] Resize browser ke ukuran HP
  - [ ] Atau test langsung di HP via local IP
  - [ ] Semua buttons mudah diklik
  - [ ] Text readable

- [ ] **Console**
  - [ ] Buka F12 → Console tab
  - [ ] Saat save, lihat `[DIARY DEBUG]` logs
  - [ ] Tidak ada error messages (warna merah)

---

## 🐛 COMMON ISSUES LOKAL

### Problem: "File not found" saat buka from file://

**Solusi:** Gunakan local web server (baca di atas)

Browser security membatasi file:// untuk app complex.

---

### Problem: "Data tidak tersimpan antar refresh"

Ini NORMAL jika:
- Buka sambil offline
- localStorage belum ter-support di browser

**Check:** F12 → Console → Paste:
```javascript
localStorage.setItem('test', '123')
localStorage.getItem('test')
```

Harus return `"123"` jika localStorage OK.

---

### Problem: "Gambar tidak muncul setelah upload"

Check di F12 → Console:
```javascript
let e = JSON.parse(localStorage.getItem('default_entries'))[0]
Object.keys(e.images).length  // Harus > 0
```

Jika 0 = gambar tidak tersimpan (storage full).

---

## 🧪 ADVANCED TEST

### Test Storage Limit

```javascript
// Di console, jalankan:
let size = JSON.stringify(JSON.parse(localStorage.getItem('default_entries'))).length
(size / (1024*1024)).toFixed(2)  // Ukuran dalam MB
```

Jika > 4.5 MB = akan error saat upload

**Solusi:** Hapus entries lama atau compress gambar lebih.

---

### Test Multiple Diaries

```javascript
// Buat diary "diary1"
// Go to setup.html?diary=diary1

// Buat diary "diary2"  
// Go to setup.html?diary=diary2

// Verify data terpisah
// Check console:
Object.keys(localStorage)  // Lihat semua keys
```

---

## 📊 DEVICE COMPATIBILITY

| Device | Status | Notes |
|--------|--------|-------|
| Chrome Desktop | ✅ | Tested |
| Firefox | ✅ | Tested |
| Safari (Mac) | ✅ | Tested |
| Edge | ✅ | Tested |
| Opera | ✅ | Tested |
| iPhone Safari | ✅ | Tested |
| Android Chrome | ✅ | Tested |
| Android Firefox | ✅ | Tested |
| IE 11 | ⚠️ | Limited (deprecated) |

---

## 🎓 BELAJAR LEBIH LANJUT

### File Dokumentasi:
- `README.md` - Overview
- `DEPLOYMENT.md` - Deploy ke GitHub Pages
- `REPAIRS.md` - Technical details
- `TESTING_GUIDE.md` - Comprehensive testing
- `firebase-config.js` - Firebase setup (optional)

### Buka di Browser:
```
file:///d:/DIARY WEB/README.md
```

---

## ✅ READY TO DEPLOY?

Jika semua test passed:

1. Go ke `DEPLOYMENT.md`
2. Follow GitHub Pages setup (5 menit)
3. Share link ke orang terpercaya!

---

**Happy testing!** 🎉

Pertanyaan? Check console logs (F12) untuk debug info.
