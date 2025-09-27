# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

--------------------------------------------------------------------------------------------

# BFSI Sales Portal — Frontend (Shreed Vyas & Yukta Raghuvanshi)

**Project**: BFSI Sales & Lead Portal  
**Assignment**: Assessment Project (AccMoveOn Technologies)  
**Submitted by**: Shreed Vyas & Yukta Raghuvanshi  
**Repo**: [Frontend GitHub Repo](https://github.com/yuktaraghuvanshi/accmoveon-frontend-new.git)  
**Assignment Date**: 19-Sep-2025  
**Submission Date**: 26-Sep-2025

---

## 1. Project Overview
The frontend of BFSI Sales Portal is built using React.js with Redux for state management. It allows users to login, manage customers, leads, and products, and view dashboard metrics with real-time data fetched from the FastAPI backend.

---

## 2. Prerequisites
- Node.js 16+  
- NPM 8+  
- A running instance of the backend API (`http://localhost:8000`)  

---

## 3. Environment Variables
Create a `.env` file in the frontend root with:

```env
REACT_APP_API_URL=http://localhost:8000



src/
 ├─ api/
 │   └─ axiosInstance.js       # Axios instance with JWT interceptor
 ├─ store/
 │   ├─ authSlice.js           # Login/logout, JWT token
 │   ├─ customerSlice.js       # Customer CRUD
 │   ├─ leadSlice.js           # Lead CRUD
 │   ├─ productSlice.js        # Product CRUD
 │   
 ├─ components/                # Reusable components (forms, tables, headers)
 ├─ pages/                     # Page-level components (Dashboard, Customers, Leads, Products)
 |└─ App.jsx                    # Main app file
  



  ## 5. API Endpoints (brief)

The frontend interacts with the following backend API endpoints via Axios:

| Module    | Method | Endpoint           | Description                  |
|-----------|--------|------------------|------------------------------|
| Users     | POST   | /users/login      | Login and get JWT token      |
| Users     | POST   | /users/refresh    | Refresh access token         |
| Users     | POST   | /users/logout     | Logout                       |
| Users     | POST   | /users/           | Create new user              |
| Users     | GET    | /users/           | List all users               |
| Customers | POST   | /customers/       | Create a customer            |
| Customers | GET    | /customers/       | List customers               |
| Customers | PUT    | /customers/{id}   | Update customer              |
| Customers | DELETE | /customers/{id}   | Delete customer              |
| Leads     | POST   | /leads/           | Create a lead                |
| Leads     | GET    | /leads/           | List leads                   |
| Leads     | PUT    | /leads/{id}       | Update lead                  |
| Leads     | DELETE | /leads/{id}       | Delete lead                  |
| Products  | POST   | /products/        | Create a product             |
| Products  | GET    | /products/        | List products                |
| Products  | PUT    | /products/{id}    | Update product               |
| Products  | DELETE | /products/{id}    | Delete product               |
