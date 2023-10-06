// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const apiRoutes = require('./src/router');
// const cors = require('cors')

// const app = express();
// app.use(cors())


// mongoose.connect('mongodb+srv://tanapat:bomkap_150146@shorturl.gvuxcow.mongodb.net/short-url-db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
// })
// .catch((err) => {
//   console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err);
// });


// app.use(bodyParser.json());
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use('/api', apiRoutes);

// const ShortURL = mongoose.model("ShortURL", {
//   originalURL: String,
//   shortURL: String,
// });

// app.post("/api/shorten", async (req, res) => {
//   const { originalURL } = req.body;
//   const shortURL = shortid.generate();

//   const newShortURL = new ShortURL({ originalURL, shortURL });
//   await newShortURL.save();

//   res.json({ shortURL });
// });



// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`เซิร์ฟเวอร์กำลังทำงานบนพอร์ต ${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/shorturl", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const app = express();
app.use(bodyParser.json());
const cors = require('cors');

const ShortURL = mongoose.model("ShortURL", {
     originalURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },

});

mongoose.connect('mongodb+srv://tanapat:bomkap_150146@shorturl.gvuxcow.mongodb.net/short-url-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
})
.catch((err) => {
  console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err);
});

app.post("/api/shorten", async (req, res) => {
  const { originalURL } = req.body;
  const shortURL = shortid.generate();

  const newShortURL = new ShortURL({ originalURL, shortURL });
  await newShortURL.save();

  res.json({ shortURL });
});

app.get("/:shortURL", async (req, res) => {
  const { shortURL } = req.params;
  const result = await ShortURL.findOne({ shortURL });

  if (result) {
    res.redirect(result.originalURL);
  } else {
    res.status(404).send("Short URL not found");
  }
});



const corsOptions = {
  origin: '*', // ระบุ * เพื่ออนุญาตให้ทุกโดเมนเรียกใช้งาน
  methods: ['GET', 'OPTIONS', 'POST'], // ระบุ HTTP methods ที่อนุญาต
};

app.use(cors(corsOptions));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
