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


router.post('/banhang/add', async (req, res) => {
    try {
        const id = req.body.ma;
        const TrangThai = req.body.trangthai;
        const Nhanvien = req.body.ma_nhanvien;
        const request = new sql.Request();
        request.input('ma', sql.Int, id);
        request.input('trangthai', sql.NVarChar, TrangThai);
        request.input('nhanvien', sql.Int, Nhanvien);
        const result = await request.query(`
    EXEC AddCustomerOrder 
    @customer_id=@ma,
    @status=@trangthai,
    @employee_id=@nhanvien
`);
        if (result) console.log("Trueeee");
        const result1 = await sql.query(`SELECT TOP 10 c.name, co.* FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id`);
        res.render('banhang', { dulieu: result1.recordset });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// router.post('/banhang/check1', async (req, res) => {
//     const result = await sql.query(`SELECT TOP 100 c.name, co.* FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id WHERE co.status=N'Đang xử lí'`);
//     res.render('banhang', { dulieu: result.recordset });
// });
router.post('/banhang', async (req, res) => {
    const request = new sql.Request();
    const check1 = req.body.checked1;
    const check2 = req.body.checked2;
    const check3 = req.body.checked3;
    const inputData1 = req.body.input_data1;
    const inputData2 = req.body.input_data2;
    var Dk1 = null;
    if (check1) Dk1 = 'Đang xử lí';
    if (check2) Dk1 = 'Đang giao';
    if (check3) Dk1 = 'Đã giao';
    request.input('dk1', sql.NVarChar, Dk1);
    request.input('InputData1', sql.NVarChar, inputData1);
    request.input('InputData2', sql.NVarChar, inputData2);
    console.log(inputData2);

    if (inputData1 && inputData2) {
        const result = await request.query(`EXEC FindCustomerOrdersByStatusAndDatetime @dk1, @InputData1, @InputData2`);
        res.render('banhang', { dulieu: result.recordset });

    }
    else if (inputData1 && !inputData2) {
        const result = await request.query(`EXEC FindCustomerOrdersByStatusAndDatetime @dk1, @InputData1, NULL`);
        res.render('banhang', { dulieu: result.recordset });
    }
    else if (!inputData1 && inputData2) {
        const result = await request.query(`EXEC FindCustomerOrdersByStatusAndDatetime @dk1, NULL, @InputData2`);
        res.render('banhang', { dulieu: result.recordset });
    }
    else {
        const result1 = await request.query(`EXEC FindCustomerOrdersByStatusAndDatetime @dk1, NULL, NULL`);
        res.render('banhang', { dulieu: result1.recordset });


    }

});
export default router;


