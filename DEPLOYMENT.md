# Hướng dẫn Deploy lên GitHub và Vercel

## Phần 1: Chuẩn bị trên GitHub

### 1.1 Tạo Repository trên GitHub

1. Đăng nhập vào [GitHub](https://github.com)
2. Nhấn **+** ở góc phải trên cùng → **New repository**
3. Đặt tên repository (ví dụ: `highlanduef-tem1-hub`)
4. **KHÔNG** khởi tạo README, .gitignore, hoặc license (chúng ta đã có rồi)
5. Nhấn **Create repository**

### 1.2 Push code lên GitHub

Trong terminal của dự án, chạy các lệnh sau:

```bash
# Thay thế YOUR_USERNAME và YOUR_REPO_NAME
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Hoặc nếu remote chưa tồn tại
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push code lên
git branch -M main
git push -u origin main
```

**Lưu ý:** Khi push lên, GitHub sẽ yêu cầu nhập credentials hoặc sử dụng SSH key.

### 1.3 Cấu hình Git credentials (tùy chọn)

Để tránh nhập credentials mỗi lần push:

**Sử dụng SSH (Khuyến nghị):**

```bash
# Tạo SSH key nếu chưa có
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy SSH public key
cat ~/.ssh/id_ed25519.pub

# Thêm key vào GitHub: Settings → SSH and GPG keys → New SSH key
# Sau đó sử dụng SSH URL
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Hoặc sử dụng Personal Access Token:**

```bash
# Tạo token tại: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
# Chọn scopes: repo, workflow

# Cấu hình git
git config credential.helper store
# Lần tới push, sẽ yêu cầu nhập credentials - dùng token làm password
```

---

## Phần 2: Deploy lên Vercel

### 2.1 Chuẩn bị Vercel Account

1. Đăng nhập/Tạo tài khoản tại [Vercel](https://vercel.com)
2. Liên kết tài khoản GitHub của bạn
3. Cho phép Vercel truy cập repository

### 2.2 Import Project từ GitHub

1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Nhấn **Add New** → **Project**
3. Nhấn **Import Git Repository**
4. Chọn repository của bạn (ví dụ: `highlanduef-tem1-hub`)
5. Nhấn **Import**

### 2.3 Cấu hình Environment Variables

Sau khi nhấn Import:

1. Trong phần **Environment Variables**, thêm các biến:

```
SUPABASE_PROJECT_ID=fagezlpesnttzjoxnmit
SUPABASE_PUBLISHABLE_KEY=sb_publishable_U2HOrdltEmJZTFRtP1pQpg_GxJ4lEOm
SUPABASE_URL=https://fagezlpesnttzjoxnmit.supabase.co
VITE_SUPABASE_PROJECT_ID=fagezlpesnttzjoxnmit
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_U2HOrdltEmJZTFRtP1pQpg_GxJ4lEOm
VITE_SUPABASE_URL=https://fagezlpesnttzjoxnmit.supabase.co
```

2. Nhấn **Deploy** hoặc **Create** để bắt đầu deploy đầu tiên

### 2.4 Cấu hình Domain (Tùy chọn)

1. Vercel sẽ cấp cho bạn một URL tạm thời (ví dụ: `your-project.vercel.app`)
2. Để sử dụng domain riêng:
   - Vào **Project Settings** → **Domains**
   - Nhập domain của bạn
   - Cấu hình DNS theo hướng dẫn của Vercel

---

## Phần 3: Quy trình Development & Deployment

### 3.1 Workflow hàng ngày

1. **Thay đổi code**
   ```bash
   # Chỉnh sửa code...
   ```

2. **Commit và Push**
   ```bash
   git add .
   git commit -m "Mô tả thay đổi"
   git push origin main
   ```

3. **Vercel tự động deploy**
   - Vercel sẽ phát hiện push lên GitHub
   - Tự động build và deploy
   - Bạn có thể xem trạng thái tại Vercel Dashboard

### 3.2 Xem logs và debug

**Trên GitHub:**
- Repository → **Actions** tab để xem CI/CD status

**Trên Vercel:**
- Project Dashboard → **Deployments** tab
- Nhấn vào deployment để xem logs chi tiết
- **Logs** tab cho server-side logs

### 3.3 Rollback (Khôi phục phiên bản trước)

Trên Vercel Dashboard → Deployments:
1. Tìm deployment trước đó
2. Nhấn **... (three dots)** → **Promote to Production**

---

## Phần 4: Kiểm tra & Testing

### 4.1 Test trước khi push

```bash
# Kiểm tra code style
npm run lint

# Format code
npm run format

# Build production
npm run build

# Preview build
npm run preview
```

### 4.2 Kiểm tra Website sau Deploy

1. Vào URL Vercel cấp cho bạn (ví dụ: `https://your-project.vercel.app`)
2. Kiểm tra:
   - Trang tải đúng
   - Supabase authentication hoạt động
   - Database queries hoạt động
   - Images/Assets tải đúng
   - Không có lỗi trong console

---

## Phần 5: Troubleshooting

### Build Failed trên Vercel

**Kiểm tra:**
1. Xem Vercel Build Logs
2. Đảm bảo environment variables được set đúng
3. Chạy `npm run build` cục bộ để test
4. Kiểm tra `.gitignore` - không nên ignore files quan trọng

### Environment Variables không hoạt động

1. Vercel Dashboard → **Settings** → **Environment Variables**
2. Đảm bảo biến được thêm cho environment đúng (Production, Preview, Development)
3. Redeploy project sau khi thêm biến

### Supabase Connection Error

1. Kiểm tra SUPABASE_URL và SUPABASE_PUBLISHABLE_KEY
2. Đảm bảo Supabase project đang chạy
3. Kiểm tra CORS settings trên Supabase

### Static Files/Images không tải

1. Đảm bảo files nằm trong `/public` folder
2. Reference như: `/logo.png` (không `./ hoặc `./public/`)
3. Check Vercel deployment logs

---

## Phần 6: Environment Variables tối ưu cho Production

### Khuyến nghị bảo mật:

1. **KHÔNG** commit file `.env` - nó đã có trong `.gitignore`
2. **CÓ** commit file `.env.example` - để hướng dẫn developers
3. Set environment variables trực tiếp trên Vercel Dashboard
4. Sử dụng Vercel Secrets Manager cho sensitive values

### Staging vs Production:

**Trên Vercel**, bạn có thể set các environment variables khác nhau cho:
- Production (branch: main)
- Preview (pull requests)
- Development (local)

---

## Tóm tắt Lệnh Quan trọng

```bash
# Setup ban đầu
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main

# Lệnh hàng ngày
git add .
git commit -m "Thay đổi gì đó"
git push origin main

# Local testing
npm run lint
npm run build
npm run preview

# Xem status
git status
git log --oneline -10
```

---

**Chúc bạn deploy thành công! 🚀**

Nếu gặp vấn đề, hãy kiểm tra:
1. Vercel Build Logs
2. Vercel Deployment Logs
3. Browser Console (F12)
4. Vercel Environment Variables
