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


router.post("/banhang", async (req, res) => {
    const request = new sql.Request();
    const inputData1 = req.body.input_data1;
    const inputData2 = req.body.input_data2;
    request.input('InputData1', sql.NVarChar, inputData1);
    request.input('InputData2', sql.NVarChar, inputData2);
    const result = await request.query(`EXEC FindCustomerOrdersByTimePeriod @InputData1, @InputData2`);
    res.render('banhang', { dulieu: result.recordset });

});
router.post('/nhaphang/add', async (req, res) => {
    try {
        const id = req.body.ma;
        const TrangThai = req.body.trangthai;
        const Nhanvien = req.body.ma_nhanvien;
        const request = new sql.Request();
        request.input('ma', sql.Int, id);
        request.input('Status', sql.NVarChar, TrangThai);
        request.input('nhanvien', sql.Int, Nhanvien);
        const result = await request.query(`
    EXEC AddCustomerOrder 
    @customer_id=@id,
    @status=@Status,
    @employee_id=@nhanvien
`);
        if (result) console.log("Trueeee");
        const result1 = await sql.query(`SELECT * FROM Inbound_Order`);
        res.render('nhaphang', { dulieu: result1.recordset });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
export default router;


