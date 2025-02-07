import app from "./src/app";
import userRouter from "./src/routers/userRouter";
import authRouter from "./src/routers/authRouter";
import serviceRouter from "./src/routers/serviceRouter";
import hospitalRouter from "./src/routers/hospitalRouter";

import "dotenv/config";

const PORT = 4000;

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/service", serviceRouter);
app.use("/hospital", hospitalRouter);

app.listen(PORT, () => {
  console.log("Servidor rodando")
});