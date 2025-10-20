# 🎮 QUICK REFERENCE CARD

## 🚀 Start Development Server
```bash
npm run dev
```
OR double-click: `start.bat`

---

## 🌐 URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| PUBG | http://localhost:3000/pubg |
| Free Fire | http://localhost:3000/freefire |
| Admin | http://localhost:3000/admin |

---

## 🔐 Admin Login

**Username**: `admin`  
**Password**: `admin123`

⚠️ Change password in: `lib/auth.ts` (line 6)

---

## 📊 Tournament Settings

### PUBG Mobile
- Slots: **25 teams**
- Entry: **₹80**
- Winner: **₹1000**
- Runner-up: **₹400**

### Free Fire
- Slots: **12 teams**
- Entry: **₹80**
- Winner: **₹500**
- Runner-up: **₹260**

---

## 📁 Important Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page |
| `app/pubg/page.tsx` | PUBG registration |
| `app/freefire/page.tsx` | Free Fire registration |
| `app/admin/page.tsx` | Admin dashboard |
| `lib/database.ts` | Data storage |
| `lib/auth.ts` | Admin auth |
| `public/payment-qr.png` | **ADD QR CODE HERE** |

---

## 🛠️ Common Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 🚀 Deploy to Vercel

```bash
# Option 1: Via GitHub
git init
git add .
git commit -m "Initial commit"
# Push to GitHub, then import in Vercel

# Option 2: Direct deploy
npm install -g vercel
vercel
```

---

## 📥 Export Team Data

1. Login to admin panel
2. Select PUBG or Free Fire tab
3. Click "Export to Excel"
4. File downloads automatically

---

## 🔧 Customize Settings

### Change Slot Limits
Edit `lib/database.ts`:
```typescript
pubgSlots: 25,      // Change PUBG limit
freeFireSlots: 12,  // Change Free Fire limit
```

### Change Prizes
Edit `app/pubg/page.tsx` and `app/freefire/page.tsx`

### Change Colors
Edit `tailwind.config.ts`

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
npm run dev
```

### Module errors
```bash
rm -rf node_modules
npm install
```

### Build errors
```bash
npm run build
# Fix errors shown
```

---

## ⚡ Quick Test

1. ✅ Visit http://localhost:3000
2. ✅ Click PUBG or Free Fire
3. ✅ Fill registration form
4. ✅ Upload payment screenshot
5. ✅ Submit form
6. ✅ Login to /admin
7. ✅ View registered team
8. ✅ Export to Excel

---

## 📱 Mobile Testing

Open on phone:
- Find your PC's IP: `ipconfig`
- Access: `http://YOUR_IP:3000`

---

## 🔒 Security Checklist

- [ ] Change admin password
- [ ] Add real payment QR code
- [ ] Test all forms
- [ ] Test admin panel
- [ ] Set JWT_SECRET in Vercel
- [ ] Clear test data before launch

---

## 💡 Pro Tips

1. **Backup Data**: Download Excel exports regularly
2. **Test Mobile**: Most users will use phones
3. **Monitor Slots**: Check admin panel often
4. **Share Link**: Use short URL service for easy sharing
5. **Screenshot Payments**: Verify screenshots in admin panel

---

## 📞 Emergency Commands

```bash
# Stop server: Ctrl + C

# Clear data:
rm -rf data/

# Reset everything:
rm -rf node_modules data .next
npm install
npm run dev
```

---

## ✅ Pre-Launch Checklist

- [ ] Added payment QR code
- [ ] Changed admin password
- [ ] Tested registration flow
- [ ] Tested admin panel
- [ ] Tested Excel export
- [ ] Tested on mobile
- [ ] Cleared test data
- [ ] Ready to deploy!

---

**Keep this card handy!** 📌
