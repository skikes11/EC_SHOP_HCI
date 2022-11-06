const mongoose = require("mongoose");
try {
  const connectionString = "mongodb+srv://Ecommerce:<password>@cluster0.jwahiqc.mongodb.net/?retryWrites=true&w=majority"
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Database Connected Successfully");
} catch (err) {
  console.log("Database Not Connected");
}
