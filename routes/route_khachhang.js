import express from "express";
import sql from "mssql";

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
sql.connect(config);
const router = express.Router()

router.post('/khachhang/add', async (req, res) => {
    const request = new sql.Request();
    const inputData1 = req.body.ten;
    const inputData2 = req.body.phone;
    request.input('name', sql.NVarChar, inputData1);
    request.input('SDT', sql.NVarChar, inputData2);
    const result = await request.query(`
    EXEC AddCustomer 
    @customer_name = @name, 
    @phone = @SDT`);
    if (result) console.log("Trueeee");
    const result1 = await sql.query(`SELECT * FROM Customer`);
    res.render('khachhang', { dulieu: result1.recordset });
})

router.post('/khachhang', async (req, res) => {
    const request = new sql.Request();
    const inputData1 = req.body.input_data1;
    const inputData2 = req.body.input_data2;
    if (inputData1) {
        request.input('InputData', sql.NVarChar, inputData1);
        const result = await request.query(`SELECT * FROM Customer WHERE name LIKE '%' + @InputData  + '%';`);
        res.render('khachhang', { dulieu: result.recordset });
    }
    else if (inputData2) {
        request.input('InputData', sql.NVarChar, inputData2);
        const result = await request.query(`SELECT * FROM Customer WHERE phone LIKE '%' + @InputData  + '%';`);
        res.render('khachhang', { dulieu: result.recordset });
    }
    else {
        const result = await sql.query(`SELECT * FROM Customer`);
        res.render('khachhang', { dulieu: result.recordset });
    }
})

router.post("/khachhang/xoa", async (req, res) => {
    const Xoa = req.body.xoa;
    const request = new sql.Request();
    request.input('customer_id', sql.NVarChar, Xoa);
    const result = await request.query(`EXEC DeleteCustomer @customer_id = @customer_id
    `);
    if (result) console.log("Trueeee");
    const result1 = await sql.query(`SELECT * FROM Customer`);
    res.render('khachhang', { dulieu: result1.recordset });
})
export default router;

