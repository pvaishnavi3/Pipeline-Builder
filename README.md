# 🔧 Pipeline Builder

A visual pipeline builder application that allows users to create and validate data processing pipelines using an intuitive drag-and-drop interface. Built with React and FastAPI, this application enables users to construct complex workflows by connecting various node types and validates them as Directed Acyclic Graphs (DAGs).

## ✨ Features

- **Visual Pipeline Construction**: Drag-and-drop interface for building pipelines
- **Multiple Node Types**: Support for various processing nodes including:
  - Input nodes
  - LLM (Large Language Model) nodes
  - Output nodes
  - Text processing nodes
  - Filter nodes
  - Transform nodes
  - API integration nodes
  - Database nodes
  - Validator nodes
- **Real-time Validation**: Automatic DAG (Directed Acyclic Graph) validation
- **Interactive Canvas**: Zoom, pan, and navigate with ease using React Flow
- **Minimap Navigation**: Quick overview and navigation of complex pipelines
- **RESTful API**: FastAPI backend for pipeline parsing and validation

## 🏗️ Architecture

### Frontend
- **Framework**: React 18.2.0
- **Flow Library**: React Flow 11.8.3
- **State Management**: Zustand 5.0.9
- **Styling**: Custom CSS with modern design patterns

### Backend
- **Framework**: FastAPI (Python)
- **CORS**: Configured for local development
- **Validation**: Custom DAG validation algorithm

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pvaishnavi3/Pipeline-Builder.git
cd Pipeline-Builder
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
pip install fastapi uvicorn pydantic
```

Start the backend server:

```bash
uvicorn main:app --reload --port 8000
```

The backend API will be available at `http://127.0.0.1:8000`

### 3. Frontend Setup

In a new terminal, navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`

## 📖 Usage

1. **Add Nodes**: Drag node types from the toolbar onto the canvas
2. **Connect Nodes**: Click and drag from one node's handle to another to create connections
3. **Build Pipeline**: Construct your data processing pipeline by connecting multiple nodes
4. **Validate**: The system automatically validates if your pipeline forms a valid DAG
5. **Submit**: Use the submit functionality to send your pipeline to the backend for analysis

## 🔌 API Endpoints

### `GET /`
Health check endpoint
- **Response**: `{"Ping": "Pong"}`

### `POST /pipelines/parse`
Parse and validate a pipeline
- **Request Body**:
  ```json
  {
    "nodes": [...],
    "edges": [...]
  }
  ```
- **Response**:
  ```json
  {
    "num_nodes": 5,
    "num_edges": 4,
    "is_dag": true
  }
  ```

### API Documentation
Interactive API documentation is available at `http://127.0.0.1:8000/docs` when the backend is running.

## 📁 Project Structure

```
Pipeline-Builder/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── models.py            # Pydantic models
│   └── utils/
│       ├── __init__.py
│       └── graph.py         # DAG validation logic
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── nodes/           # Node components
│   │   ├── styles/          # CSS styles
│   │   ├── utils/           # Utility functions
│   │   ├── App.js           # Main application
│   │   ├── toolbar.js       # Node toolbar
│   │   ├── submit.js        # Submit functionality
│   │   └── store.js         # State management
│   └── package.json
├── .gitignore
└── README.md
```

## 🛠️ Development

### Frontend Development
- The frontend uses React Flow for the visual pipeline builder
- State is managed using Zustand for simplicity and performance
- Custom node components are located in `src/nodes/`
- Styling follows a modern, clean design pattern

### Backend Development
- FastAPI provides automatic API documentation
- Pydantic models ensure type safety
- The DAG validation algorithm checks for cycles in the pipeline graph
- CORS is configured to allow requests from the React development server

## 🧪 Testing

### Frontend
```bash
cd frontend
npm test
```

### Backend
```bash
cd backend
pytest
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- Built as part of the VectorShift Frontend Technical Assessment
- React Flow for the excellent flow diagram library
- FastAPI for the modern Python web framework

---

**Note**: This application is designed for local development. For production deployment, additional configuration for security, environment variables, and hosting would be required.
