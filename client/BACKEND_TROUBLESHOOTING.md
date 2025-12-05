# Backend Troubleshooting Guide

## Current Issue: "Backend endpoint not found" (404 Error)

### Quick Tests

1. **Test if backend is accessible:**
   - Open in browser: `https://comp229-backend-f9fs.onrender.com/api`
   - You should see: `{"message":"Welcome to My Portfolio",...}`
   - If you see 404 or connection error, the backend is sleeping or not deployed

2. **Test auth endpoint directly:**
   - Open: `https://comp229-backend-f9fs.onrender.com/api/auth/signup`
   - You should see an error (method not allowed for GET) but NOT a 404
   - If 404, the route is not configured

### Solutions

#### Solution 1: Wait for Backend to Wake Up (Render Free Tier)
- Render free tier services "sleep" after 15 minutes of inactivity
- First request can take 30-60 seconds to wake up
- **Action**: Wait 30-60 seconds and try again

#### Solution 2: Redeploy Backend
If the backend is not responding:

1. Go to Render dashboard
2. Select your backend service
3. Click "Manual Deploy" → "Deploy latest commit"
4. Wait for deployment to complete
5. Try signup again

#### Solution 3: Verify Backend Code is Deployed
Make sure these files exist in your deployed backend:
- `Backend/app/routers/auth.js` - Should have signup/signin routes
- `Backend/app/controllers/auth.js` - Should have signup/signin controllers
- `Backend/server.js` - Should have `app.use('/api/auth', authRouter);`

#### Solution 4: Check Backend Logs
1. Go to Render dashboard
2. Select your backend service
3. Click "Logs" tab
4. Look for:
   - `Server running at http://localhost:...`
   - `====> Successfully connected to MongoDB.`
   - Any error messages

### Expected Backend Response

**GET /api** should return:
```json
{
  "message": "Welcome to My Portfolio",
  "status": "Backend is running",
  "endpoints": {
    "auth": "/api/auth/signup, /api/auth/signin",
    "projects": "/api/projects",
    "contacts": "/api/contacts",
    "services": "/api/services",
    "users": "/api/users"
  }
}
```

**POST /api/auth/signup** should:
- Accept: `{ firstname, lastname, email, password }`
- Return: `{ success: true, token: "...", user: {...} }`
- NOT return 404

### If Still Not Working

1. Check Render dashboard for service status
2. Verify environment variables are set (MONGO_URI, JWT_SECRET)
3. Check if backend build is successful
4. Try accessing backend from a different network/device
5. Contact Render support if service shows as "Live" but returns 404

