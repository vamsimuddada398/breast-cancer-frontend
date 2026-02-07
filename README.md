Navigate to frontend directory
cd frontend

Install dependencies
npm install

Configure environment
cp .env.example .env.local

Start development server
npm run dev

Frontend will be available at `http://localhost:5173`
--------------------------------------------------------------------------------------#########################################################----------------------------------------------------------------------

Deploy Frontend to Vercel

1. Prepare Project:
   Ensure build works locally
   npm run build
   
   Update vercel.json with proper routes

2. Connect to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Import → GitHub Project
   - Configure:
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variables:
     - `VITE_API_URL`: Your Render backend URL

3. Deploy:
   
   Vercel auto-deploys on git push
   git push origin main

Your frontend URL will be like: `https://your-app.vercel.app`

