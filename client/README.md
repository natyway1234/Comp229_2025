# Portfolio Web Application - Frontend

## Overview
This is the frontend React application for the Portfolio Web Application assignment.

## Features
- ✅ User Authentication (Sign Up / Sign In)
- ✅ Protected Routes for Projects, Services, and Contacts
- ✅ JWT Token-based Authentication
- ✅ Performance Optimized Components
- ✅ Cypress E2E Tests

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will run on `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

## Testing

### Run Cypress Tests

```bash
# Open Cypress Test Runner
npm run cypress:open

# Run tests headlessly
npm run cypress:run
```

### Test Files Location
All Cypress tests are in the `cypress/e2e` folder:
- `01-signup.cy.js` - Sign Up test
- `02-signin-add-project.cy.js` - Sign In and Add Project
- `03-signin-edit-project.cy.js` - Sign In and Edit Project
- `04-signin-delete-project.cy.js` - Sign In and Delete Project

## Performance Optimization

The projects listing component has been optimized with:
- React.memo for component memoization
- useMemo for expensive calculations
- useCallback for event handlers
- Separated loading states

See `PERFORMANCE_OPTIMIZATION.md` for details.

## Deployment

See `DEPLOYMENT.md` for deployment instructions.

## API Configuration

The API base URL is configured in `src/api.js`:
- Production: `https://comp229-backend-f9fs.onrender.com/api`

## Project Structure

```
client/
├── cypress/          # Cypress E2E tests
├── public/           # Static assets
├── src/
│   ├── components/   # React components
│   ├── contexts/     # React contexts (AuthContext)
│   ├── api.js        # API configuration
│   └── MainRouter.jsx # Routing configuration
└── package.json
```

## Requirements Checklist

### PART I - Authentication and Authorization ✅
- [x] Backend authentication with token
- [x] Passwords encrypted in database
- [x] Frontend sign-up form
- [x] Frontend sign-in form with token storage
- [x] Backend middleware for protected routes
- [x] Users: only edit/delete require auth
- [x] Frontend includes token in headers

### PART 2 - Testing ✅
- [x] Cypress test for Sign Up
- [x] Cypress test for Sign In and Add Project
- [x] Cypress test for Sign In and Edit Project
- [x] Cypress test for Sign In and Delete Project

### PART II - Performance Optimization ✅
- [x] Performance optimization for projects listing
- [x] Lighthouse report instructions provided

### PART III - CI/CD ✅
- [x] Backend deployed to Render
- [x] Frontend deployment guide provided
- [x] Deployment verification checklist
