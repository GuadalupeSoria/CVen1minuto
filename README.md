# CVen1minuto - Portfolio CV Generator

Web application to create and optimize CVs in 1 minute with AI assistance.

## ✨ New Features

### 🤖 AI CV Optimizer
- Optimize your CV for specific job offers using AI (Groq API)
- Get tailored suggestions for:
  - Optimized "About me" section
  - Recommended job title
  - Skills suggestions
  - Experience highlights
  - Project recommendations
  - ATS keywords

### 📱 Ads Monetization
Ads are shown before:
- Downloading PDF
- Using AI optimizer

## 🚀 Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Get your **Groq API key** (free):
1. Go to [https://console.groq.com/keys](https://console.groq.com/keys)
2. Sign up/login
3. Create a new API key
4. Copy the key to `.env`:
```env
VITE_GROQ_API_KEY=gsk_xxxxxxxxxxxxx
```

### 3. Run development server
```bash
npm run dev
```

## 📊 Ads Configuration (Web)

For web applications, use **Google AdSense** (NOT AdMob):

### Option 1: Google AdSense (Recommended)
1. Apply at [https://www.google.com/adsense](https://www.google.com/adsense)
2. Wait for approval (can take 1-3 days)
3. Get your AdSense code
4. Add to `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```
5. Add ad units in `AdModal.tsx`:
```tsx
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### Option 2: Alternative Ad Networks (No approval needed)
- **PropellerAds**: [https://propellerads.com](https://propellerads.com)
- **Media.net**: [https://www.media.net](https://www.media.net)
- **Buy Me a Coffee**: [https://www.buymeacoffee.com](https://www.buymeacoffee.com) (donations)

### AdSense vs AdMob
- **AdMob**: Mobile apps only (Android/iOS)
- **AdSense**: Websites only
- **Both**: Can share the same Google account but different platforms

## 🎨 Responsive Layout

The CV layout automatically adjusts:
- **Many projects (>1) + Few experiences (<3)**: Projects move below experiences for better space optimization
- **Normal case**: Two-column layout (experiences left, projects right)

## 📦 Build for production
```bash
npm run build
```

## 🌐 Deploy

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard:
- `VITE_GROQ_API_KEY`

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

Add environment variables in Netlify dashboard.

## 📝 Technologies

- **React** 18.3
- **TypeScript** 5.5
- **Vite** 5.4
- **Tailwind CSS** 3.4
- **html2pdf.js** 0.10
- **Groq API** (Llama 3.1 8B)

## 🔧 Features

- ✅ Real-time CV preview
- ✅ PDF export
- ✅ Multi-language support (ES/EN)
- ✅ Customizable theme colors
- ✅ Photo upload
- ✅ Projects, Experience, Education sections
- ✅ Skills and Languages
- ✅ AI-powered optimization
- ✅ Responsive design
- ✅ LocalStorage persistence

## 📄 License

MIT

