import app from "./src/app";
import userRouter from "./src/routers/userRouter";

const PORT = 3000;

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log("Servidor rodando")
});