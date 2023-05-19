import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import operatorRoutes from "./routes/operators.js";
import facteursRoutes from "./routes/facteurs.js";
import adminroutes from "./routes/admin.js";
import directeurRoutes from "./routes/directeur.js";
import secrétaireRoutes from "./routes/secretaire.js";
import notificationsRoutes from "./routes/notifications.js";
// import JdesRoutes from "./routes/Jdes.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken ,checkRole} from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// import adminRoutes from "./routes/admin.js"
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.post("/auth/register",verifyToken,checkRole('admin') , register);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/operators", operatorRoutes);
app.use("/facteurs",facteursRoutes);
app.use("/admin",adminroutes);
app.use("/directeur",directeurRoutes)
app.use("/secretaire",secrétaireRoutes)
app.use("/notifications",notificationsRoutes)


const uri = "mongodb+srv://SNRTDB:SNRTDB@cluster0.xkmpvai.mongodb.net/<dbname>?retryWrites=true&w=majority";

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => 
  console.log(`${error} did not connect`)
  
  );
