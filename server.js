import express from "express";
import sql from "mssql";
import bodyParser from "body-parser";
import session from "express-session";
import khachhang from "./routes/route_khachhang.js";
import nhanvien from "./routes/route_nhanvien.js";
import banhang from "./routes/route_banhang.js";
import hanghoa from "./routes/route_hanghoa.js";
import doitac from "./routes/route_doitac.js";
import nhaphang from "./routes/route_nhaphang.js";
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));
app.set('view engine', 'ejs');
app.use(express.json()); // Use the JSON body parser middleware
app.use(session({
    secret: '110404', // Mã bí mật để ký và giải mã session ID
    resave: true,
    saveUninitialized: true
}));
function requireLogin(req, res, next) {
    if (req.session && req.session.userId) {
        // Người dùng đã đăng nhập
        return next();
    } else {
        // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
        res.render('login');
    }
}
const config = {
    user: "sa",
    password: "123456",
    server: "localhost",
    database: "ChildrenShopDBMS3",
    port: 1433, // Port mặc định của SQL Server
    options: {
        encrypt: false, // Nếu bạn sử dụng kết nối mật, đặt giá trị này thành true
    },
};
sql.connect(config, (err) => {
    if (err) {
        console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
    } else {
        console.log('Đã kết nối đến cơ sở dữ liệu');
    }
});
app.use('/', khachhang);
app.use('/', nhanvien);
app.use('/', banhang);
app.use('/', hanghoa);
app.use('/', nhaphang);
app.use('/', doitac);
app.get('/tongquan', requireLogin, (req, res) => {
    res.render('tongquan.ejs');
});
app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', async (req, res) => {
    if (req.body.username == 'admin' && req.body.password == 'soict2023') {
        res.render('tongquan.ejs');
    }
    else res.render('login.ejs');
})






app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
