# ✅ PRE-DEPLOYMENT CHECKLIST

Complete this checklist before deploying to Vercel or sharing your website.

---

## 🔴 CRITICAL (Must Do Before Deploy)

### 1. Add Payment QR Code
- [ ] Save your QR code image as `payment-qr.png`
- [ ] Place in `public/` folder
- [ ] Verify it displays correctly on both PUBG and Free Fire pages
- [ ] Test QR code actually works for payments

**Location**: `C:\Users\ISHU\OneDrive\Desktop\TOURNAMENT\public\payment-qr.png`

---

### 2. Change Admin Password
- [ ] Open `lib/auth.ts`
- [ ] Find line 6: `const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123', 10)`
- [ ] Change `'admin123'` to a strong password
- [ ] Save the file
- [ ] Test login with new password

**Your New Password**: _________________ (write it down securely!)

---

### 3. Test Everything Locally
- [ ] Home page loads and looks good
- [ ] PUBG page loads completely
- [ ] Free Fire page loads completely
- [ ] Navigation between pages works
- [ ] Payment QR code shows correctly
- [ ] Registration form works
- [ ] Image upload works
- [ ] Admin login works
- [ ] Teams show in admin panel
- [ ] Excel export works
- [ ] Slot counter updates
- [ ] Mobile view is responsive

---

## 🟡 IMPORTANT (Should Do)

### 4. Test Registration Flow
- [ ] Fill out entire PUBG form
- [ ] Upload a test payment screenshot
- [ ] Submit form
- [ ] See success message
- [ ] Login to admin panel
- [ ] Verify team appears in list
- [ ] Download Excel file
- [ ] Check data is correct
- [ ] Delete test data before launch

---

### 5. Mobile Testing
- [ ] Open site on your phone
- [ ] Test all pages on mobile
- [ ] Try registering from phone
- [ ] Test image upload from phone
- [ ] Verify responsive design
- [ ] Test on different screen sizes

**Tested on devices**:
- [ ] iPhone/Android phone
- [ ] Tablet
- [ ] Desktop/Laptop
- [ ] Different browsers (Chrome, Safari, Firefox)

---

### 6. Content Verification
- [ ] All rules are correct
- [ ] Prize amounts are correct
- [ ] Entry fees are correct
- [ ] Slot limits are correct (25 PUBG, 12 Free Fire)
- [ ] Contact information is correct
- [ ] No spelling mistakes
- [ ] All dates/times are correct

---

## 🟢 OPTIONAL (Nice to Have)

### 7. Performance Check
- [ ] Page loads fast
- [ ] Images load quickly
- [ ] No console errors
- [ ] Forms submit quickly
- [ ] Admin panel is responsive

---

### 8. Security Review
- [ ] Admin password is strong
- [ ] Test data is cleared
- [ ] No sensitive info in code
- [ ] Environment variables set (if using)

---

### 9. Documentation
- [ ] Read SETUP_GUIDE.md
- [ ] Read VERCEL_DEPLOY.md
- [ ] Understand how to use admin panel
- [ ] Know how to export data

---

## 🚀 READY TO DEPLOY

### 10. Final Steps
- [ ] All above items checked
- [ ] Payment QR code added
- [ ] Admin password changed
- [ ] All tests passed
- [ ] Mobile tested
- [ ] Ready to share with participants

---

## 📋 POST-DEPLOYMENT CHECKLIST

After deploying to Vercel:

### 11. Verify Production Site
- [ ] Visit your Vercel URL
- [ ] Test home page
- [ ] Test PUBG registration
- [ ] Test Free Fire registration
- [ ] Test admin login
- [ ] Verify QR code shows
- [ ] Try test registration
- [ ] Check admin panel
- [ ] Export Excel file
- [ ] Test on mobile

---

### 12. Share & Monitor
- [ ] Share URL with participants
- [ ] Monitor registrations
- [ ] Check admin panel regularly
- [ ] Download Excel backups
- [ ] Respond to any issues

---

## 🎯 LAUNCH PREPARATION

### Before Announcing Tournament:
- [ ] Website is live and tested
- [ ] Payment system is working
- [ ] Admin panel is accessible
- [ ] Data storage is working
- [ ] Excel export is working
- [ ] Mobile version works
- [ ] QR code is correct
- [ ] All information is accurate

### When Launching:
- [ ] Share website URL
- [ ] Monitor first few registrations
- [ ] Verify payments manually
- [ ] Check data in admin panel
- [ ] Be ready to support participants

---

## 🔍 COMMON ISSUES TO CHECK

- [ ] Payment QR code is YOUR actual payment QR (not placeholder)
- [ ] Admin password has been changed from default
- [ ] All prize amounts are correct
- [ ] Slot limits match your tournament size
- [ ] Images load on all pages
- [ ] Forms validate correctly
- [ ] Error messages show properly
- [ ] Success messages appear after registration

---

## 📊 DATA MANAGEMENT

Before launch:
- [ ] Clear any test data
- [ ] Backup current data (if any)
- [ ] Test data export works
- [ ] Know where data is stored (`data/` folder)

After launch:
- [ ] Regular Excel exports
- [ ] Monitor slot counts
- [ ] Verify payments
- [ ] Keep backups

---

## ✨ FINAL CHECK

**Everything is ready when:**
- ✅ All critical items (red) completed
- ✅ Most important items (yellow) completed
- ✅ Payment QR code is real and working
- ✅ Admin password is changed and saved
- ✅ All tests passed
- ✅ Mobile version works
- ✅ You're confident it works!

---

## 🎉 YOU'RE READY!

Once all critical items are checked:

1. **Deploy to Vercel** (follow VERCEL_DEPLOY.md)
2. **Test production site**
3. **Share with participants**
4. **Monitor registrations**
5. **Have a successful tournament!** 🏆

---

**Date Completed**: _______________

**Deployment URL**: _______________

**Admin Password**: _______________ (keep secure!)

---

**Good luck with your tournament!** 🎮🏆
