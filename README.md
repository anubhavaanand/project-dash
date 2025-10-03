# Personal Research Paper Dashboard

## Overview
The Personal Research Paper Dashboard is a desktop application built using Electron, Node.js, React, and SQLite. It is designed to help users manage their academic research papers efficiently. The application allows users to add, edit, delete, and view details of their research papers, providing a user-friendly interface for tracking progress and deadlines.

## Features
- Add new research papers with metadata such as title, status, and deadline.
- View a list of all research papers with their details.
- Edit existing papers to update their information.
- Delete papers that are no longer needed.
- Filter papers by their status for better organization.

## Technologies Used
- **Electron**: For building cross-platform desktop applications.
- **Node.js**: For server-side logic and database interactions.
- **React**: For building the user interface.
- **SQLite**: For storing and managing research paper data.

## Project Structure
```
Personal-Research-Paper-Dashboard
├── public
│   └── index.html
├── src
│   ├── main
│   │   ├── electron.ts
│   │   └── database.ts
│   ├── renderer
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── PaperList.tsx
│   │   │   ├── PaperDetails.tsx
│   │   │   └── AddPaperForm.tsx
│   │   └── pages
│   │       └── Dashboard.tsx
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd Personal-Research-Paper-Dashboard
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Application
To start the application, run the following command:
```
npm start
```

### Building the Application
To build the application for production, use:
```
npm run build
```

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.