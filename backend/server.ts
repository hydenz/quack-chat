import express from "express";
import http from "http";
import signup from "routes/signup";
import signIn from "routes/signin";
import users from "routes/users";
import pictures from "routes/pictures";
import cors from "cors";
import { authenticateToken } from "middlewares/validators";
import messages from "routes/messages";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
app.use(signup);
app.use(signIn);
app.use(authenticateToken);
app.use(users);
app.use(messages);
app.use(pictures);

export default server;
// app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
