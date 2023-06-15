const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { adminRouter } = require("./routes/admin.routes");
const { userRouter } = require("./routes/users.routes");
const { orderRouter } = require("./routes/orders.routes");
const { auth } = require("./middleware/auth.middleware");
const { productRouter } = require("./routes/products.routes");
const { cartRouter } = require("./routes/carts.routes");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
    res.send({msg:"Welcome to the Gadget Hunt"})
});

app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/admin", adminRouter);
app.use("/shipping", orderRouter);
app.use(auth);
app.use("/cart", cartRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`server is running at ${process.env.port}`);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Something went wrong");
    console.log(err);
  }
});
