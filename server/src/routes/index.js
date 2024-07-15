import { Router } from "express";
import productsRouter from "./products";
import authRouter from "./auth";
import authenticateToken from "../middleware/auth";
import categoryRouter from "./category";

const router = Router();

router.get("/", (req, res) => {
  res.send("Home");
});
router.use("/products", productsRouter);
router.use("/auth", authRouter);
router.use("/categorys", categoryRouter)

export default router;