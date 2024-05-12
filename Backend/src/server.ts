import app from "./app.js";
import connectDb from "./config/database.js";
import { acceptInvitation } from "./controllers/invitations.js";

 connectDb();

 //acceptInvitation('NjYzZmM0NmI1ODllYWQwNTQyMTdhM2I2LTY2NDExMmNmN2FiMzc3NWFkY2U1OTFhMS02NjAxYjVlMTdkODljYmZhYTlkZDNhNjM=')

app.get("/", (req, res)=>{
    res.end(`Welcome to the ProjectLoom backend.`)
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
