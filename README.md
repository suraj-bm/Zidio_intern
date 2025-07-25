# 📊 Excel Data Analyzer (MERN Stack)

This project is a full-stack web application that allows users to upload Excel files, dynamically visualize data using interactive charts, generate summaries, and download or save graph images. Built with the **MERN stack**: MongoDB, Express, React, and Node.js.

---

## 🚀 Features

- ✅ Upload `.xls` or `.xlsx` Excel files
- ✅ Auto-detect and display column headers
- ✅ Select X and Y axes for visualization
- ✅ Generate interactive Bar Charts using Chart.js
- ✅ Save graph to backend (as image)
- ✅ Download chart as PNG image
- ✅ Generate data summaries from selected columns

---

## 🛠️ Tech Stack

| Frontend | Backend  | Database |
|----------|----------|----------|
| React    | Node.js  | MongoDB  |
| Chart.js | Express  | Mongoose |

---

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/excel-data-analyzer.git
cd excel-data-analyzer
```

### 2. Backend Setup

```bash
cd backend
npm install
touch .env
```

**`.env` Example:**
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/excelDB
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:5000`

---

## 🧪 How to Use

1. Visit the homepage (`/dashboard`)
2. Upload an Excel file
3. Select X and Y axes from the dropdown
4. Click **"Generate Graph"** to display the chart
5. Use:
   - **Save** – Upload chart image to backend
   - **Download Graph** – Download as PNG
   - **Generate Summary** – View a text-based summary

---

## 📁 Folder Structure

```
excel-data-analyzer/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── uploads/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── App.js
│
└── README.md
```

---

## 📃 API Endpoints

| Method | Endpoint               | Description                     |
|--------|------------------------|---------------------------------|
| POST   | `/api/upload`          | Upload Excel file               |
| GET    | `/api/upload/columns`  | Fetch column headers            |
| POST   | `/api/upload/chartdata`| Get chart data for X and Y axes |
| POST   | `/api/upload/savegraph`| Save base64 chart image         |
| POST   | `/api/upload/summary`  | Generate summary                |

---

## 💡 Future Improvements

- Add user authentication
- Enable multi-chart support
- Generate PDF reports (charts + summaries)
- Add 3D visualization (e.g., using Plotly.js)

---

## 👨‍💻 Author

- **Suraj BM**  
- GitHub: [@suraj-bm]((https://github.com/suraj-bm))

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).
