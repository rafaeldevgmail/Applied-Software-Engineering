import dotenv from "dotenv";
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 8080;

// "Play" no servidor
app.listen(PORT, () => {
    console.log(`🚀 App is running on ${PORT}`);
})   
