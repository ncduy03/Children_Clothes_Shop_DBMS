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

export default router;


