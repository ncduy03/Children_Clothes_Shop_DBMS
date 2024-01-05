import express from "express";
import sql from "mssql";
import bodyParser from "body-parser";
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
    database: "ChildrenShopDBMS",
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

app.route('/nhanvien')
    .post(async (req, res) => {
        const request = new sql.Request();
        const inputData1 = req.body.input_data1;
        const inputData2 = req.body.input_data2;
        if (inputData1) {
            request.input('InputData', sql.NVarChar, inputData1);
            const result = await request.query(`EXEC FindEmployeesByName @InputData`);
            res.render('nhanvien', { dulieu: result.recordset });
        }
        else if (inputData2) {
            request.input('InputData', sql.NVarChar, inputData2);
            const result = await request.query(`EXEC FindEmployeesByRole @InputData`);
            res.render('nhanvien', { dulieu: result.recordset });
        }
        else {
            const result = await request.query(`SELECT * FROM Employee`);
            res.render('nhanvien', { dulieu: result.recordset });
        }
    })
    .get(async (req, res) => {
        const result = await sql.query(`SELECT * FROM Employee`);
        res.render('nhanvien', { dulieu: result.recordset });
    })


app.get('/tongquan', (req, res) => {
    res.render('tongquan.ejs');
})

app.route('/doitac')
    .get(async (req, res) => {
        const result = await sql.query(`SELECT * FROM Manufacturer`);
        res.render('doitac', { dulieu: result.recordset });
    })
    .post(async (req, res) => {
        const request = new sql.Request();
        const inputData1 = req.body.input_data1;
        const inputData2 = req.body.input_data2;
        if (inputData1) {
            request.input('InputData', sql.NVarChar, inputData1);
            const result = await request.query(`EXEC FindManufacturerByName @InputData`);
            res.render('doitac', { dulieu: result.recordset });
        }
        else if (inputData2) {
            request.input('InputData', sql.NVarChar, inputData2);
            const result = await request.query(`EXEC FindManufacturerByPhone @InputData`);
            console.log(result);
            res.render('doitac', { dulieu: result.recordset });
        }
        else {
            const result = await request.query(`SELECT * FROM Manufacturer`);
            res.render('doitac', { dulieu: result.recordset });
        }
    });


app.get('/giaodich', (req, res) => {
    res.render('giaodich.ejs');
})

app.route('/kiemkho')
    .get(async (req, res) => {
        const result = await sql.query(`SELECT * FROM Product`);
        res.render('kiemkho', { dulieu: result.recordset });
    })

    .post(async (req, res) => {
        const request = new sql.Request();
        const inputData1 = req.body.input_data1;
        const inputData2 = req.body.input_data2;
        const inputData3 = req.body.input_data3;
        if (inputData1) {
            request.input('InputData', sql.NVarChar, inputData1);
            const result = await request.query(`EXEC FindProductsByCategoryName @InputData`);
            res.render('kiemkho', { dulieu: result.recordset });
        }
        else if (inputData2) {
            request.input('InputData', sql.NVarChar, inputData2);
            const result = await request.query(`EXEC FindProductByID @InputData`);
            console.log(result);
            res.render('kiemkho', { dulieu: result.recordset });
        }
        else if (inputData3) {
            request.input('InputData', sql.NVarChar, inputData3);
            const result = await request.query(`EXEC FindProductByName @InputData`);
            console.log(result);
            res.render('kiemkho', { dulieu: result.recordset });
        }
        else {
            const result = await request.query(`SELECT * FROM Product`);
            res.render('kiemkho', { dulieu: result.recordset });
        }
    });


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});