import { Router } from "express";
import productsRouter from "./products";
import authRouter from "./auth";

const router = Router();

router.get("/", (req, res) => {
  res.send("Home");
});
router.use("/products", productsRouter);
router.use("/auth", authRouter);

export default router;