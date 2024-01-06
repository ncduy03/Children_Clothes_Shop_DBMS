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

app.get('/tongquan', (req, res) => {
    res.render('tongquan.ejs');
})

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




app.route('/banhang')
    .get(async (req, res) => {
        const result = await sql.query(`SELECT c.name, co.* FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id`);
        res.render('banhang', { dulieu: result.recordset });
    })
    .post(async (req, res) => {
        const request = new sql.Request();
        const inputData1 = req.body.input_data1;
        const inputData2 = req.body.input_data2;
        if (inputData1) {
            request.input('InputData', sql.NVarChar, inputData1);
            const result = await request.query(`EXEC FindCustomerOrdersByStatus @InputData`);
            res.render('banhang', { dulieu: result.recordset });
        }
        else if (inputData2) {
            request.input('InputData', sql.NVarChar, inputData2);
            const result = await request.query(`EXEC FindCustomerOrdersByTimePeriod @InputData`);
            console.log(result);
            res.render('banhang', { dulieu: result.recordset });
        }
        else {
            const result = await request.query(`SELECT * FROM Customer_Order`);
            res.render('banhang', { dulieu: result.recordset });
        }
    });


app.route('/nhaphang')
    .get(async (req, res) => {
        const result = await sql.query(`SELECT m.manufacturer_name, io.* FROM Inbound_Order io JOIN Manufacturer m ON m.manufacturer_id = io.manufacturer_id`);
        res.render('nhaphang', { dulieu: result.recordset });
    })
    .post(async (req, res) => {
        const request = new sql.Request();
        const inputData1 = req.body.input_data1;
        const inputData2 = req.body.input_data2;
        if (inputData1) {
            request.input('InputData', sql.NVarChar, inputData1);
            const result = await request.query(`EXEC FindInboundOrdersByStatus @InputData`);
            res.render('nhaphang', { dulieu: result.recordset });
        }
        else if (inputData2) {
            request.input('InputData', sql.NVarChar, inputData2);
            const result = await request.query(`EXEC FindInboundOrdersByTimePeriod @InputData`);
            console.log(result);
            res.render('nhaphang', { dulieu: result.recordset });
        }
        else {
            const result = await request.query(`SELECT * FROM Inbound_Order`);
            res.render('nhaphang', { dulieu: result.recordset });
        }
    });



app.route('/hanghoa')
    .get(async (req, res) => {
        const result = await sql.query(`SELECT p.product_id, p.name, p.inbound_price, p.outbound_price, p.quantity, pc.category_name FROM Product p JOIN Product_category pc ON p.product_category_id = pc.product_category_id`);
        console.log(result);
        res.render('hanghoa', { dulieu: result.recordset });
    })

    .post(async (req, res) => {
        const request = new sql.Request();
        const inputData1 = req.body.input_data1;
        const inputData2 = req.body.input_data2;
        const inputData3 = req.body.input_data3;
        if (inputData1) {
            request.input('InputData', sql.NVarChar, inputData1);
            const result = await request.query(`EXEC FindProductsByCategoryName @InputData`);
            res.render('hanghoa', { dulieu: result.recordset });
        }
        else if (inputData2) {
            request.input('InputData', sql.NVarChar, inputData2);
            const result = await request.query(`EXEC FindProductByID @InputData`);
            console.log(result);
            res.render('hanghoa', { dulieu: result.recordset });
        }
        else if (inputData3) {
            request.input('InputData', sql.NVarChar, inputData3);
            const result = await request.query(`EXEC FindProductByName @InputData`);
            console.log(result);
            res.render('hanghoa', { dulieu: result.recordset });
        }
        else {
            const result = await request.query(`SELECT * FROM Product`);
            res.render('hanghoa', { dulieu: result.recordset });
        }
    });


app.route('/doitac')
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
            res.render('doitac', { dulieu: result.recordset });
        }
        else {
            const result = await request.query(`SELECT * FROM Manufacturer`);
            res.render('doitac', { dulieu: result.recordset });
        }
    })
    .get(async (req, res) => {
        const result = await sql.query(`SELECT * FROM Manufacturer`);
        res.render('doitac', { dulieu: result.recordset });
    })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});