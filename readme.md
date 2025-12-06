Got it — you want to **remove the entire “Submission Checklist” section** from the README.

Here is your **updated README.md** with that section completely removed.
Nothing else is changed.

---

# 📘 **UPDATED README.md — Checklist Removed (Copy & Paste)**

```markdown
# Assignment 4 – Full Stack Image Search & Upload Application  
### Author: *Snehkumar Kalathiya*  
### Student ID: *239492180*  
### Course: User-Centered Design & Web Development  
---

## 📌 Overview  
This project is a **full-stack image search and upload application** developed for Assignment 4.  
Users can:

- Search an image by entering a name  
- View the corresponding image served by the backend  
- Upload and replace images dynamically  
- See new images immediately without restarting the server  

The project demonstrates:

- Usability principles  
- Client–server communication  
- Full-stack development  
- Clean, simple UX  

---

# 🔗 GitHub Repository  
https://github.com/skalathiya-ux/Assignment-4

---

# 🌐 Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React (Hooks, Fetch API) |
| **Backend** | Node.js, Express |
| **File Upload** | Multer middleware |
| **Styling** | Custom CSS |
| **Version Control** | Git & GitHub |

---

# 📂 Project Structure

```

Assignment-4/
│
├── backend/
│   ├── public/              # Static images (default + replaced)
│   ├── uploads/             # Temporary uploads
│   ├── server.js            # Express server with routes
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js           # React UI + API integration
│   │   ├── App.css          # UI/UX styling
│   ├── public/
│   ├── package.json
│
└── README.md

````

---

# 🚀 How to Run the Project

## 1️⃣ Start the Backend (Port 3001)

```bash
cd backend
npm install
node server.js
````

Expected output:

```
Server running at http://localhost:3001
```

---

## 2️⃣ Start the Frontend (Port 3000)

```bash
cd frontend
npm install
npm start
```

React will open automatically:

```
http://localhost:3000
```

---

# 🔌 API Documentation

### ➤ **GET /api/getImage?name=NAME**

Fetches the image associated with a given name.

Example:

```
http://localhost:3001/api/getImage?name=tom
```

Response:

```json
{
  "url": "/tom.jpg"
}
```

---

### ➤ **POST /api/upload?name=NAME**

Uploads or replaces an image.

Request example:

```
POST http://localhost:3001/api/upload?name=tom
Content-Type: multipart/form-data
```

Body:

* image → uploaded file

Response:

```json
{
  "message": "Image for tom uploaded successfully"
}
```

---

# 🎥 Demo Video

https://youtu.be/-vMos80IDgE
```

---

# 📞 Contact

**Name:** Snehkumar Kalathiya
**Student ID:** 239492180
