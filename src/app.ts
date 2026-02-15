import express from "express";
import * as dotenv from "dotenv";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";
import { generalLimiter } from "./middleware/rate-limit";
import adminRoutes from "./modules/admin/admin.routes";
import userRoutes from "./modules/users/users.routes";
import postRoutes from "./modules/posts/posts.routes";
import followRoutes from "./modules/follows/follows.routes";
import groupRoutes from "./modules/groups/groups.routes";
import { authUser } from "./middleware/auth.middleware";
import swaggerui from "swagger-ui-express";
import swaggerDocument from "./docs/swagger.json";
import handleErrors from "./middleware/error.middleware";

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(express.json());
app.use(generalLimiter);

//API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/follows", followRoutes);
app.use("/api/groups", groupRoutes);
app.use(handleErrors);
app.use("/docs", authUser, swaggerui.serve, swaggerui.setup(swaggerDocument));

export default app;
