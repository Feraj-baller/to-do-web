const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const tasks = require("./routes/tasks")
const connectDB = require("./db/connect")
const cors = require("cors")
require("dotenv").config()

// Add this at the top of your file with other requires
const path = require("path")

app.use(bodyParser.urlencoded({ extended: false }));

// Middleware to parse JSON bodies (for API requests)
app.use(bodyParser.json())

// Add CORS middleware

app.use(cors())

//middleware
app.use(express.static("public"))
app.use(express.json())

// Update your port configuration to be more flexible
app.set("port", process.env.PORT || 3000)

// Add this route to explicitly serve index.html for the root path
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.use("/api/v1/tasks", tasks)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(app.get("port"), () => {
      console.log("Listening on port", app.get("port") + "...")
    })
  } catch (error) {
    console.log(error)
  }
}

start()





