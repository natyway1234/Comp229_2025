# Deployment Guide

## Backend Deployment (Render)

### Current Status
✅ **Backend is deployed at**: `https://comp229-backend-f9fs.onrender.com`

### Environment Variables Required on Render:
1. `MONGO_URI` - MongoDB Atlas connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/Portfolio?retryWrites=true&w=majority`
   - Current: `mongodb+srv://hillsidesplc_db_user:YVrOgY9kZP6UR7Iq@cluster0.stsxxsq.mongodb.net/Portfolio?retryWrites=true&w=majority`

2. `JWT_SECRET` - Secret key for JWT token generation
   - Generate a secure random string (e.g., using `openssl rand -base64 32`)
   - **Important**: Change from default value for production

3. `PORT` - Server port (usually auto-set by Render)

### Backend API Endpoints:
- Base URL: `https://comp229-backend-f9fs.onrender.com/api`
- Auth: `/api/auth/signup`, `/api/auth/signin`
- Projects: `/api/projects`
- Contacts: `/api/contacts`
- Services: `/api/services`
- Users: `/api/users`

## Frontend Deployment

### Option 1: Deploy to Render (Recommended)

1. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Build Command: `cd client && npm install && npm run build`
   - Start Command: `cd client && npm run preview` (or use a static file server)

2. **Or Deploy as Static Site**
   - Build the frontend: `cd client && npm run build`
   - Upload the `dist` folder to a static hosting service

### Option 2: Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend directory: `cd client`
3. Run: `vercel`
4. Follow the prompts

### Option 3: Deploy to Netlify

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Navigate to frontend directory: `cd client`
3. Build: `npm run build`
4. Deploy: `netlify deploy --prod --dir=dist`

### Frontend Environment Variables

If deploying separately, you may need to set:
- `VITE_API_URL` (if using environment-based API URLs)

Currently, the API URL is hardcoded in `api.js` to:
- `https://comp229-backend-f9fs.onrender.com/api`

## Verification Checklist

### Backend Verification:
- [ ] Backend is accessible at `https://comp229-backend-f9fs.onrender.com`
- [ ] API health check: `https://comp229-backend-f9fs.onrender.com/api`
- [ ] MongoDB connection is working
- [ ] Environment variables are set correctly
- [ ] CORS is configured to allow frontend domain

### Frontend Verification:
- [ ] Frontend is accessible at deployed URL
- [ ] Can navigate to all pages
- [ ] Sign up functionality works
- [ ] Sign in functionality works
- [ ] Projects can be viewed
- [ ] Authenticated operations work (create/edit/delete)
- [ ] API calls are successful

## Deployment Links

### Backend:
- **URL**: https://comp229-backend-f9fs.onrender.com
- **API Base**: https://comp229-backend-f9fs.onrender.com/api

### Frontend:
- **URL**: [Your frontend deployment URL]
- **Status**: [Pending deployment]

## Post-Deployment Testing

1. **Test Authentication**:
   - Sign up a new user
   - Sign in with credentials
   - Verify token is stored

2. **Test Protected Routes**:
   - Try to add a project (should require auth)
   - Try to edit a project (should require auth)
   - Try to delete a project (should require auth)

3. **Test Public Routes**:
   - View projects (should work without auth)
   - View services (should work without auth)
   - View contacts (should work without auth)

4. **Performance Testing**:
   - Run Lighthouse audit
   - Check page load times
   - Verify optimized rendering

## Troubleshooting

### Backend Issues:
- **503 Error**: Backend may be sleeping (Render free tier)
- **CORS Error**: Check CORS configuration in `server.js`
- **Database Error**: Verify `MONGO_URI` is set correctly

### Frontend Issues:
- **API Errors**: Verify backend URL in `api.js`
- **Build Errors**: Check Node version compatibility
- **Routing Issues**: Ensure proper base path configuration

## Next Steps

1. Deploy frontend to your chosen platform
2. Update CORS settings if frontend is on different domain
3. Test all functionality in production
4. Generate Lighthouse performance report
5. Document final deployment URLs

