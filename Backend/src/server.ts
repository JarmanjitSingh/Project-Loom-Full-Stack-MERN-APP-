import app from "./app.js";
import connectDb from "./config/database.js";
import { acceptInvitation } from "./controllers/invitations.js";

 connectDb();

 //acceptInvitation('663bc03c62dc63226e8e340b','663fba87786c4bb239e26c17')

app.get("/", (req, res)=>{
    res.end(`Welcome to the ProjectLoom backend.`)
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
