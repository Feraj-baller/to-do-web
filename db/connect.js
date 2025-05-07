/*const mongoose = require("mongoose")

const connectionString = "mongodb+srv://john:ihateuwella@cluster0.eqlvl18.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = (connectionString)=>{
    return mongoose.connect(connectionString,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB*/


//For establishing a connection while the server is running
/*mongoose.connect(connectionString).then(()=>{
    console.log("Successful connection")
}).catch((err)=>{
    console.log(err)
})*/

const mongoose = require("mongoose")

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
