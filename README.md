# Taskify - Drag & Drop Todo Application

A modern, interactive todo application built with React and TypeScript. Features include drag-and-drop functionality, local storage persistence, and a clean, intuitive interface.

## Features

- ✨ Create and manage todos
- 🔄 Drag and drop todos between active and completed lists
- 💾 Automatic local storage persistence
- 🎨 Modern and responsive design
- ⚡ Built with React and TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/vishalr7667/Todo-App-using-typescript
cd Todo-App-using-typescript
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

To run the application in development mode:

```bash
npm run dev
```

This will start the development server, typically at `http://localhost:5173`. Open your browser and navigate to this address to view the application.

### Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Technologies Used

- React
- TypeScript
- Vite
- @hello-pangea/dnd (for drag and drop functionality)
- Tailwind CSS

## Project Structure

```
taskify/
├── src/
│   ├── components/
│   │   ├── InputField.tsx
│   │   └── TodoList.tsx
│   ├── model.ts
│   └── App.tsx
├── public/
├── package.json
└── README.md
```

