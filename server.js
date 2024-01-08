import express from "express";
import sql from "mssql";
import bodyParser from "body-parser";
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
app.get('/tongquan', (req, res) => {
    res.render('tongquan.ejs');
})







app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
