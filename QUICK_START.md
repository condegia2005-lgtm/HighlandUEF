# 🚀 QUICK START - Deploy lên Vercel

## ✅ Đã hoàn thành:

Tôi vừa chuẩn bị dự án của bạn để deploy lên GitHub và Vercel. Các file sau đã được tạo và push lên GitHub:

1. **`.env.example`** - Hướng dẫn environment variables cần thiết
2. **`vercel.json`** - Cấu hình Vercel deployment
3. **`DEPLOYMENT.md`** - Hướng dẫn chi tiết (đọc file này để hiểu rõ)
4. **`.gitignore`** - Cập nhật để bảo vệ sensitive files

---

## ⚡ Các bước tiếp theo (chỉ cần 5 phút):

### Bước 1: Truy cập Vercel

Vào https://vercel.com - Đăng nhập hoặc tạo tài khoản

### Bước 2: Import Project

1. Nhấn **"Add New"** → **"Project"**
2. Nhấn **"Import Git Repository"**
3. Chọn repository: **`HighlandUEF`** (hoặc tên repository của bạn)
4. Nhấn **"Import"**

### Bước 3: Thêm Environment Variables

Trong form "Configure Project", thêm các biến sau:

```
SUPABASE_PROJECT_ID = fagezlpesnttzjoxnmit
SUPABASE_PUBLISHABLE_KEY = sb_publishable_U2HOrdltEmJZTFRtP1pQpg_GxJ4lEOm
SUPABASE_URL = https://fagezlpesnttzjoxnmit.supabase.co
VITE_SUPABASE_PROJECT_ID = fagezlpesnttzjoxnmit
VITE_SUPABASE_PUBLISHABLE_KEY = sb_publishable_U2HOrdltEmJZTFRtP1pQpg_GxJ4lEOm
VITE_SUPABASE_URL = https://fagezlpesnttzjoxnmit.supabase.co
```

### Bước 4: Deploy

Nhấn **"Deploy"** - Vercel sẽ tự động build và deploy website!

---

## 📍 Sau khi Deploy xong:

1. Vercel sẽ cấp bạn URL: `https://your-project.vercel.app`
2. Mỗi lần bạn `git push` lên GitHub, Vercel sẽ **tự động deploy** lại
3. Website của bạn sẽ **online global** 24/7

---

## 🔍 Kiểm tra Status:

Vercel Dashboard → **Deployments** tab:
- Xanh ✅ = Deploy thành công
- Đỏ ❌ = Có lỗi (click vào để xem logs)

---

## 📝 Lệnh Git thường dùng:

```bash
# Thay đổi code, rồi push
git add .
git commit -m "Mô tả thay đổi"
git push origin main

# Vercel sẽ tự động detect và deploy!
```

---

## 📖 Cần hướng dẫn chi tiết?

Xem file `DEPLOYMENT.md` trong dự án - có hướng dẫn đầy đủ tiếng Việt.

---

**Chúc mừng! Website của bạn sắp online global! 🎉**
