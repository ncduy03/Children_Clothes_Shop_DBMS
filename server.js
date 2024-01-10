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
var check = false;
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
    if (check) {
        res.render('tongquan.ejs');
    } else {
        res.render('login');
    }
});
app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.post('/login', async (req, res) => {
    if (req.body.username == 'admin' && req.body.password == 'soict2023') {
        res.render('tongquan.ejs');
        check = true;
    }
    else res.render('login.ejs');
})
app.get("/hanghoa", async (req, res) => {
    if (check) {
        const result = await sql.query(`SELECT p.product_id, p.name, p.inbound_price, p.outbound_price, p.quantity, pc.category_name FROM Product p JOIN Product_category pc ON p.product_category_id = pc.product_category_id`);
        res.render('hanghoa', { dulieu: result.recordset });
    } else {
        res.render('login');
    }
})
app.get('/khachhang', async (req, res) => {
    if (check) {
        const result = await sql.query(`SELECT * FROM Customer`);
        res.render('khachhang', { dulieu: result.recordset });
    } else {
        res.render('login');
    }
})
app.get("/nhaphang", async (req, res) => {
    if (check) {
        const result = await sql.query(`SELECT m.manufacturer_name, io.* FROM Inbound_Order io JOIN Manufacturer m ON m.manufacturer_id = io.manufacturer_id`);
        res.render('nhaphang', { dulieu: result.recordset });
    } else {
        res.render('login');
    }
})
app.get("/doitac", async (req, res) => {
    if (check) {
        const result = await sql.query(`SELECT * FROM Manufacturer`);
        res.render('doitac', { dulieu: result.recordset });
    } else {
        res.render('login');
    }
})
app.get("/nhanvien", async (req, res) => {
    if (check) {
        const result = await sql.query(`SELECT * FROM Employee`);
        res.render('nhanvien', { dulieu: result.recordset });
    } else {
        res.render('login');
    }
})
app.get("/banhang", async (req, res) => {
    if (check) {

        const result = await sql.query(`SELECT c.name, co.* FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id`);
        res.render('banhang', { dulieu: result.recordset });
    } else {
        res.render('login');
    }
})





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
