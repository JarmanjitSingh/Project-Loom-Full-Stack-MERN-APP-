import app from "./app.js";
import connectDb from "./config/database.js";

 connectDb();

 console.log("port",process.env.PORT)
 
app.get("/", (req, res)=>{
    res.end(`Welcome to the ProjectLoom backend.`)
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
