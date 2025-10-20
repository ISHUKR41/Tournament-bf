# Tournament Registration Website

A modern, professional SaaS platform for PUBG Mobile and Free Fire tournament registrations.

## Features

- ✅ Modern, responsive design
- ✅ Real-time slot tracking
- ✅ Separate pages for PUBG Mobile and Free Fire
- ✅ Payment screenshot upload
- ✅ Live stream voting system
- ✅ Admin dashboard with authentication
- ✅ Excel export functionality
- ✅ Automatic slot management
- ✅ No database required (file-based storage)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Admin Access

- URL: `/admin`
- Default Username: `admin`
- Default Password: `admin123`

**⚠️ Important: Change the admin password in `lib/auth.ts` before deploying!**

## Deployment to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy!

The app is ready for Vercel deployment with no additional configuration needed.

## Project Structure

```
├── app/
│   ├── page.tsx          # Home page
│   ├── pubg/             # PUBG registration
│   ├── freefire/         # Free Fire registration
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes
├── lib/
│   ├── database.ts       # File-based database
│   ├── auth.ts           # Authentication
│   └── excel.ts          # Excel export
├── types/
│   └── index.ts          # TypeScript types
├── data/                 # Auto-created data folder
└── public/
    └── payment-qr.png    # Payment QR code
```

## Important Notes

1. Add your payment QR code image to `public/payment-qr.png`
2. Data is stored in the `data/` folder (auto-created)
3. All registrations are saved to JSON files
4. Excel exports include all team details
5. Real-time slot tracking syncs across all users

## Tournament Limits

- PUBG Mobile: 25 teams
- Free Fire: 12 teams

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- XLSX (Excel export)
- bcryptjs (Authentication)

## License

MIT
