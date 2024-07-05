import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("這是首頁");
});

app.get("/p/:id/", (req, res) => {
  const id = req.params.id;
  console.log(id);
  let pageContent="";
  if(id === "p/CvRz0e3Awmi/"){
    pageContent="《ぷるんぷるんすぎるマシュマロアイス(Too plump marshmallow ice cream in Japan)》";
  }else if(id === "CvZP-PIguWG"){
    pageContent="《浅草で一番おすすめしたい抹茶クレープ(The most recommended matcha crepe in Asakusa)》";
  }
  res.send(pageContent);
});

// :userID這邊是網址上輸入甚麼 他就會代表甚麼
// 假設輸入/Uuser/apapapa
// 那req.params.userID 出來的就會是apapapa
app.get("/user/:userID", (req, res) => {
  const userID = req.params.userID;
  res.send(`userID = ${userID}`);
});

app.get("/book/:categoryID/:bookID", (req, res) => {
  const categoryID = req.params.categoryID;
  const bookID = req.params.bookID;
  res.send(`${categoryID}/${bookID}`);
});
// name後面的? 代表 可有可無
app.get("/users/:name?/:qwe", (req, res) => {
  if(req.params.name){
    console.log(req.params.qwe)
    console.log(req.params.name);
    res.send("Hello, " + req.params.name);
  }else{
    res.send("Hello, Guest");
  }
  
  
});

// 下面這三行是正規表達式，有符合才會執行 不符合就往下
// [0-9]+ 意思只能是數字
app.get("/books/:id([0-9]+)", (req,res) => {
  res.send("bookID: " + req.params.id)
})

// 後面接/* 就是不確定會接幾個 直接用/*表示
// 不管帶多少個 都會呈現
// 取得方式變req.params[0]
app.get("/files/*", (req, res) => {
  const filePath = req.params[0];
  res.send("路徑: " + filePath);
})

app.all("*", (req, res) => {
  res.send("<h1>404 - 找不到</h1>");
});

app.listen(3000, () => {
  console.log(`服務已啟動於 http://localhost:3000`);
})