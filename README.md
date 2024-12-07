# **Shortly Frontend**

The **Shortly** Frontend application provides the user interface for interacting with the **Shortly API**. The app allows users to securely log in, register, create short urls, and view their shortened URLs.

## **Tech Stack**

- **Frontend Framework**: React (with TypeScript)
- **Styling**: Tailwind CSS, Toaster
- **Build Tool**: Vite
- **State Management**: React Context API
- **Authentication**: JWT (JSON Web Token)

## **Pages**

- **Home**: The landing page of the application.
- **Login**: Provides a login form for users to sign in to their accounts.
- **Register**: A registration form for new users to create an account.
- **Dashboard**: Displays a list of the URLs created by the logged-in user, with their shortened versions, creation dates, and click counts.

## **Installation & Setup**

### **1. Clone the Repository**

```bash
git clone https://github.com/akshayrpatel/Shortly-frontend.git
cd shortly-frontend
```

### **2. Install Dependencies**

To get started with the project, you need to install the dependencies:

```bash
npm install
```

### **3. Set Up Environment Variables**

Create a `.env` file in the root of the project and add the following:

```env
VITE_BACKEND_URL=http://your-backend-url
VITE_FRONTEND_URL=http://localhost:5173  # For development
```

Replace `http://your-backend-url` with your backend API URL. This will be used by the frontend to make requests to the backend server.

### **4. Run the Development Server**

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
```

This will launch the app at `http://localhost:5173` (or the port specified in your `.env` file).

## **Features**

- **Login Page**: Allows users to log in with their credentials. Upon successful login, a JWT token is stored in memory and the user is redirected to the **Dashboard**.
- **Register Page**: Allows new users to create an account with a username, email, and password.
- **Dashboard Page**: Displays a list of URLs that the user has shortened, along with their original URL, short URL, creation date, and click count.
- **Home Page**: The landing page where users can get started with the app.

## **Usage**

Once you’ve set up the application, follow these steps to use the app:

1. **Login**: Enter your username and password to log in.
2. **Register**: If you don’t have an account, go to the register page and create one.
3. **Dashboard**: Once logged in, you can view all the URLs you’ve shortened in the **Dashboard** page.
4. **Shorten a URL**: On the **Dashboard**, you can shorten new URLs by using the provided modal.

## **Deploying to Production**

When you're ready to deploy, build the app using the following command:

```bash
npm run build
```

This will create a production-ready build of your app inside the `/dist` folder.

You can deploy this build to any hosting platform like **Netlify**, **Vercel**, or **GitHub Pages**.
