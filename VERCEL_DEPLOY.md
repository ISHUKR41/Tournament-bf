# 🚀 Vercel Deployment Guide

## Quick Deploy (Recommended)

### Option 1: Deploy via GitHub (Best for Updates)

1. **Create GitHub Repository**
   ```bash
   cd "C:\Users\ISHU\OneDrive\Desktop\TOURNAMENT"
   git init
   git add .
   git commit -m "Tournament registration website ready for deployment"
   ```

2. **Push to GitHub**
   - Create a new repository on GitHub.com
   - Copy the repository URL
   - Run:
   ```bash
   git remote add origin YOUR_REPO_URL
   git branch -M main
   git push -u origin main
   ```

3. **Deploy on Vercel**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"
   - Wait 2-3 minutes ✅

### Option 2: Direct Deploy (Quick but No Auto-Updates)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd "C:\Users\ISHU\OneDrive\Desktop\TOURNAMENT"
   vercel
   ```

3. **Follow Prompts**
   - Login to Vercel
   - Confirm project settings
   - Deploy!

---

## ⚙️ Vercel Configuration

### Build Settings (Auto-detected)
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Environment Variables (Optional but Recommended)

Add in Vercel Dashboard → Settings → Environment Variables:

| Key | Value | Description |
|-----|-------|-------------|
| `JWT_SECRET` | `your-random-secret-123` | Admin authentication key |

Generate a random secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔧 Post-Deployment Checklist

After deploying:

✅ **Test the live website**
   - Visit your Vercel URL
   - Test home page loads
   - Test both tournament pages

✅ **Test Registration**
   - Try registering a test team
   - Verify data saves correctly

✅ **Test Admin Panel**
   - Login with credentials
   - Check teams appear
   - Test Excel export

✅ **Verify Payment QR**
   - Check QR code shows correctly
   - Make sure it's the right image

✅ **Test on Mobile**
   - Open site on phone
   - Check responsive design
   - Test form submission

---

## 📊 Data Persistence on Vercel

**Important**: Vercel is serverless, but your data will persist because:
- File-based storage in `data/` folder
- Writes persist across requests
- Data survives deployments

**For Production**: Consider upgrading to:
- Vercel KV (key-value storage)
- External database (MongoDB, PostgreSQL)
- But current setup works fine for small tournaments!

---

## 🌐 Custom Domain (Optional)

1. Go to Vercel Dashboard
2. Select your project
3. Click "Settings" → "Domains"
4. Add your domain
5. Follow DNS configuration steps

---

## 🔒 Security Before Deploy

✅ **Change Admin Password**
   - Edit `lib/auth.ts`
   - Change default password
   - Commit changes

✅ **Add Environment Variables**
   - Set `JWT_SECRET` in Vercel
   - Don't commit `.env` files

✅ **Test Everything Locally First**
   - Full registration flow
   - Admin panel
   - Excel exports

---

## 📈 Monitoring

After deployment, monitor:
- Registration count
- Server errors (Vercel Dashboard → Logs)
- Page load times
- Mobile responsiveness

---

## 🎯 Vercel URL Examples

Your site will be available at:
```
https://tournament-registration-xyz123.vercel.app
```

You can also add custom domains:
```
https://yourtournament.com
```

---

## 💡 Tips

1. **Test Locally First**: Always test everything before deploying
2. **Use Git**: Push updates via GitHub for automatic deployments
3. **Check Logs**: Use Vercel dashboard to see errors
4. **Mobile First**: Most users will access via mobile
5. **Backup Data**: Download Excel exports regularly

---

## 🚨 Common Issues & Fixes

### Issue: Build Failed
**Solution**: 
```bash
# Test build locally
npm run build
# Fix errors, then redeploy
```

### Issue: Data Not Saving
**Solution**: 
- Check `data/` folder exists
- Verify write permissions
- Check Vercel logs for errors

### Issue: Images Not Loading
**Solution**:
- Ensure images are in `public/` folder
- Check file names match exactly
- Clear browser cache

### Issue: Admin Login Not Working
**Solution**:
- Verify password in `lib/auth.ts`
- Check `JWT_SECRET` environment variable
- Clear cookies and try again

---

## 📞 Need Help?

If deployment fails:
1. Check Vercel build logs
2. Verify all files are committed
3. Test `npm run build` locally
4. Check for TypeScript errors

---

## ✅ Deployment Complete!

Once deployed:
- Share your Vercel URL with participants
- Monitor registrations in admin panel
- Download team data before tournaments
- Enjoy your automated tournament system!

🎮 Good luck with your tournaments! 🏆
