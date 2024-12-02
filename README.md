# AcmePlex Front-End

This README provides instructions for installing and running the front-end of the Acmeplex application on your local machine. This React project uses React Router for navigation between pages.

---

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js and npm**:
   - Download and install Node.js from [Node.js Official Website](https://nodejs.org/).
   - Verify installation by running the following commands in your terminal:
     ```bash
     node -v
     npm -v
     ```

2. **Git**:
   - Download and install Git from [Git Official Website](https://git-scm.com/).
   - Verify installation by running:
     ```bash
     git --version
     ```

3. **ESLine VSCode Extension**
   - Install the [ESLint VSCode Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

4. **Code Editor (Optional)**:
   - Install a code editor like [Visual Studio Code](https://code.visualstudio.com/) for better development experience.

---

## Steps to Clone and Run the Application

### 1. Clone the Repository

Use the following command to clone the repository to your local machine:
```bash
git clone https://github.com/ensf-614-group11/frontend.git
```

Navigate to the project directory:
```bash
cd frontend
```

### 2. Install Dependencies

Run the following command to install all required dependencies:
```bash
npm install
```

### 3. Start the Development Server

To start the application in development mode, run:
```bash
npm run dev
```

This will launch the application in your default browser at http://localhost:5173/

If the browser does not open automatically, manually navigate to the above URL.

### 4. Verify React Router Functionality

The application uses React Router for navigation. You should be able to navigate between the different pages, such as:
- Viewing available movies and showtimes.
- Selecting theaters and dates.
- Booking tickets.

Ensure that the routing works seamlessly in the application.

---

## Troubleshooting

1. **Common Errors**:
   - If you encounter an error like `npm ERR! code ERESOLVE`, try clearing the cache and reinstalling dependencies:
     ```bash
     npm cache clean --force
     npm install
     ```

2. **Port Conflicts**:
   - If the development server fails to start due to port conflicts, specify a different port by running:
     ```bash
     PORT=3001 npm run dev
     ```

3. **API Issues**:
   - Ensure the backend API is running and accessible.

---

## Notes

- This application assumes a backend API is running - you must be running the backend API at http://localhost:8080/. Ensure the backend is set up and running if applicable.
- For any additional setup instructions, refer to the project documentation or contact the project maintainer.

---

## Contributions

If you would like to contribute to this project, please fork the repository and create a pull request with your changes.

---

## Contact

For questions or support, please contact the the team members.

