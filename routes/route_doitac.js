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

router.post("/doitac", async (req, res) => {
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
router.get("/doitac", async (req, res) => {
    const result = await sql.query(`SELECT * FROM Manufacturer`);
    res.render('doitac', { dulieu: result.recordset });
})

export default router;