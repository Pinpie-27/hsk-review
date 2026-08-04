# HSK Review

Web ôn tập từ vựng HSK theo ngày.

## Chạy local

```bash
npm install
npm run dev
```

Mở http://localhost:3000

## Deploy Vercel

```bash
npx vercel
```

Hoặc push lên GitHub rồi Import vào Vercel — auto detect Next.js.

## Thêm level mới (HSK1, HSK3, ...)

1. Tạo `data/hskN.ts` theo cấu trúc `data/hsk2.ts`
2. Add vào `data/index.ts`
3. Xong — home page tự hiển thị.

## Thêm ngày mới cho level hiện tại

Mở `data/hsk2.ts`, thêm object vào mảng `days`.
