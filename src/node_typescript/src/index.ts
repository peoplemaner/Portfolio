import express from "express"
import config from "../package.json"
import cors from "cors"
import mysql from "mysql"
import user from "./routes/user"
import broadcast from './routes/broadcast'

class App {
  public application : express.Application;
  constructor(){
    this.application = express();
  }
}
const app = new App().application;

//!< DB 풀 생성.
try { var db = mysql.createPool(config.db); } catch (e) { console.log(e); }

app.use(express.json());
app.use(express.urlencoded( {extended: false}));
app.use(cors());

app.use((req: express.Request, res: express.Response, next) => {
    const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;

    console.log(`url: ${req.headers.host}${req.path} / accessIP: ${ip} / query: ${JSON.stringify(req.query)} / body: ${JSON.stringify(req.body)}`);
    next();
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("start");
});

// 로그인
app.post('/login', (req, res) =>  { user.login(req, res, db); });

// 회원가입
app.post('/users', (req, res) => { user.createUser(req, res, db); });

// 방송방 조회
app.get('/broadcasts', (req, res) =>  { broadcast.getBroadCasts(req, res, db); });

// 방송방 생성
app.post('/broadcasts', (req, res) => { broadcast.createBroadcast(req, res, db); });

app.listen(config.server.port, () => {
  console.log(`Server Start ${config.server.port}`);
});

process.on('uncaughtException', function (err) {
    console.log("unhandled exception : " + err + "\n" + err.stack);
});