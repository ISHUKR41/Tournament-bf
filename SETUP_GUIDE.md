# 🎮 Tournament Registration Website - Complete Guide

## ✅ What's Been Created

A fully professional, modern SaaS tournament registration platform with:

### ✨ Features
- ✅ **Modern, Responsive Design** - Works perfectly on all devices
- ✅ **Two Tournament Pages** - PUBG Mobile & Free Fire
- ✅ **Real-time Slot Tracking** - Syncs across all users
- ✅ **Payment Integration** - QR code upload & verification
- ✅ **Live Stream Voting** - Yes/No voting system
- ✅ **Admin Dashboard** - Full control panel
- ✅ **Excel Export** - Download team data
- ✅ **Auto Slot Management** - Closes when full
- ✅ **No Database Required** - File-based storage

---

## 🚀 Getting Started

### 1. **Add Your Payment QR Code**
   - Save the QR code image you provided as `payment-qr.png`
   - Place it in: `C:\Users\ISHU\OneDrive\Desktop\TOURNAMENT\public\`
   - This will show on both registration pages

### 2. **Access the Website**
   - Click the preview button above to view the site
   - Home page: `http://localhost:3000`
   - PUBG page: `http://localhost:3000/pubg`
   - Free Fire page: `http://localhost:3000/freefire`
   - Admin panel: `http://localhost:3000/admin`

### 3. **Admin Login Credentials**
   - Username: `admin`
   - Password: `admin123`
   
   ⚠️ **IMPORTANT**: Change this password before deploying!
   - Edit file: `lib/auth.ts`
   - Find line 6: `const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10)`
   - Change 'admin123' to your desired password

---

## 📊 Admin Dashboard Features

The admin panel (`/admin`) provides:

1. **Real-time Statistics**
   - Total teams registered (PUBG & Free Fire)
   - Slots remaining
   - Total revenue
   - Player count

2. **Team Management**
   - View all registered teams
   - See player details
   - Check payment information
   - View live stream votes

3. **Excel Export**
   - Download PUBG teams data
   - Download Free Fire teams data
   - Includes all player info and payment details

4. **Live Stream Voting Results**
   - See YES vs NO votes
   - Automatic decision based on majority

---

## 🎯 Tournament Configuration

### PUBG Mobile
- **Slots**: 25 teams (100 players)
- **Entry Fee**: ₹80 per team
- **Winner Prize**: ₹1000
- **Runner-up**: ₹400
- **Map**: Erangel (Classic)

### Free Fire
- **Slots**: 12 teams (48 players)
- **Entry Fee**: ₹80 per team
- **Winner Prize**: ₹500
- **Runner-up**: ₹260
- **Map**: Bermuda/Purgatory/Kalahari

---

## 📁 Data Storage

All data is stored in the `data/` folder (auto-created):
- `pubg-teams.json` - PUBG registrations
- `freefire-teams.json` - Free Fire registrations
- `stats.json` - Real-time statistics

**Note**: This folder is automatically created when the first team registers.

---

## 🌐 Deploy to Vercel

### Step 1: Push to GitHub
```bash
cd "C:\Users\ISHU\OneDrive\Desktop\TOURNAMENT"
git init
git add .
git commit -m "Initial commit - Tournament registration website"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"
5. Done! ✅

### Step 3: Environment Variables (Optional)
In Vercel dashboard, add:
- Key: `JWT_SECRET`
- Value: `your-random-secret-key-here`

---

## 🔧 Important Files

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page with game selection |
| `app/pubg/page.tsx` | PUBG registration form |
| `app/freefire/page.tsx` | Free Fire registration form |
| `app/admin/page.tsx` | Admin dashboard |
| `lib/database.ts` | Data storage logic |
| `lib/auth.ts` | Admin authentication |
| `lib/excel.ts` | Excel export functionality |
| `public/payment-qr.png` | Payment QR code image |

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
- PUBG theme: Orange/Red
- Free Fire theme: Red/Pink

### Change Tournament Limits
Edit `lib/database.ts`:
- Line 8: `pubgSlots: 25` (change PUBG limit)
- Line 9: `freeFireSlots: 12` (change Free Fire limit)

### Change Prizes
Edit respective page files:
- `app/pubg/page.tsx`
- `app/freefire/page.tsx`

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Stop the current server and run:
npm run dev
```

### Module Not Found
```bash
npm install
```

### Image Not Showing
- Make sure `payment-qr.png` is in the `public/` folder
- Check file name is exactly `payment-qr.png`

---

## 📱 Testing Checklist

✅ Test on mobile devices
✅ Test registration flow
✅ Test payment screenshot upload
✅ Test admin login
✅ Test Excel export
✅ Test slot limits (close at 25/12)
✅ Test real-time updates

---

## 🔒 Security Notes

1. **Change Admin Password** before deployment
2. **Keep data/ folder secure** - it contains all registrations
3. **Use HTTPS** when deployed (Vercel provides this automatically)
4. **Don't commit .env files** to GitHub

---

## 💡 Features Explained

### Real-time Slot Tracking
- Updates every 5 seconds automatically
- Shows remaining slots
- Auto-closes registration when full
- Syncs across all users viewing the site

### Payment Verification
- Upload screenshot required
- Transaction ID required
- All stored with team data
- Visible in admin panel

### Live Stream Voting
- Each team votes YES or NO
- Admin sees vote count
- Majority decision shown
- Helps decide if match should be streamed

### Excel Export
- One-click download
- All team details included
- Payment information included
- Formatted professionally

---

## 📞 Support

If you encounter any issues:
1. Check the terminal for error messages
2. Verify all files are in the correct location
3. Ensure payment QR code is added
4. Check that port 3000 is not in use

---

## 🎉 You're All Set!

Your tournament registration website is now ready to use. 

**Next Steps:**
1. Add your payment QR code
2. Test the registration flow
3. Test the admin panel
4. Deploy to Vercel when ready

Good luck with your tournaments! 🏆🎮
