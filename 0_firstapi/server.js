
// API 통신을 위해 익스프레스, 파서 사용
let express = require('express'),
    bodyParser = require('body-parser');
let app = express();

// MongoDB 사용
let db = require('./models');

// req.body js오브젝트로 바꿔줌
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// db의 과일정보 모두 얻어오기
app.get('/api/fruit', async (req,res) => {
    try{
        const result = await db.Fruit.find({});
        res.json(result);
    }
    catch(err){
        console.log('show error:${err}');
    }
});

// id로 과일정보 얻어오기
app.get('/api/fruit/:id', async (req,res) => {
    try{
        const idVal = req.params["id"];
        const result = await db.Fruit.findById(idVal);
        res.json(result);
    }
    catch(err){
        console.log('show error:${err}');
    }
});

// 과일정보 등록
app.post('/api/createfruit', (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    const newFruit = new db.Fruit({
        name: req.body.name,
        type: req.body.type,
        color: req.body.color,
        isDry: req.body.isDry,
        imageUrl: req.body.imageUrl
    });

    newFruit.save().then(result =>{
        console.log(result);
    });
});

// 과일정보 삭제
app.delete('/api/fruit/:id', async (req,res)=>{
    const idVal = req.params["id"];
    const result = await db.Fruit.findByIdAndDelete(idVal);
    res.json(result);
    console.log('result : ' + res.statusCode);
});

// 구현 예정
//app.put('/api/fruit/:id', async (req,res)=>{
//});


// 스웨거 사용
const swaggerUIPath= require("swagger-ui-express");
const swaggerjsonFilePath = require("./docs/swagger.json");
app.use("/api-docs", swaggerUIPath.serve, swaggerUIPath.setup(swaggerjsonFilePath));

// 리다이렉션
app.get('/', (req, res) => {
    res.redirect('http://localhost:8080/api-docs');
  });

// HTTP 서버 열기
var listner = app.listen(process.env.PORT || 8080, ()=>{
        console.log("Port 8080");
        console.log("Port Info " + listner.address().port);
   });
