const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static("public"));  // allow images to be served

// Multer for handling file uploads
const upload = multer({ dest: "uploads/" });

// GET: return correct image
app.get("/api/getImage", (req, res) => {
    const name = req.query.name?.toLowerCase();

    let image = "default.jpg";

    if (name?.includes("tom")) image = "tom.jpg";
    else if (name?.includes("jerry")) image = "jerry.jpg";
    else if (name?.includes("dog")) image = "dog.jpg";
    else if (name?.includes("quacker")) image = "quacker.jpg";
    else {
        // Check if file exists in public folder
        const filePath = path.join(__dirname, "public", `${name}.jpg`);
        if (fs.existsSync(filePath)) {
            image = `${name}.jpg`;
        }
    }
    
    res.json({ url: "/" + image });
});

// POST: upload + replace image
app.post("/api/upload", upload.single("image"), (req, res) => {
    const character = req.query.name?.toLowerCase();

    if (!character) {
        return res.status(400).json({ error: "Missing ?name=" });
    }

    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    const newFilename = `${character}.jpg`;
    const newPath = path.join(__dirname, "public", newFilename);

    fs.rename(req.file.path, newPath, (err) => {
        if (err) return res.status(500).json({ error: "Save failed" });

        res.json({ message: "Image updated", file: newFilename });
    });
});

app.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});
