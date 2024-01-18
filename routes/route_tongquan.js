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
router.post('/tongquan', async (req, res) => {
    const batdau = req.body.timestart;
    const ketthuc = req.body.timeend;
    const request = new sql.Request();
    request.input('start', sql.NVarChar, batdau);
    request.input('end', sql.NVarChar, ketthuc);
    const result = await request.query(`SELECT dbo.Revenue(@start, @end)`);
    console.log(result.recordset[0]);
    const resultObject = result.recordset[0];

    // Lấy giá trị từ đối tượng (trong trường hợp này, có thể có nhiều key, nhưng bạn quan tâm đến giá trị của key '')
    const value = Object.values(resultObject)[0];

    // Chuyển đổi giá trị thành số nguyên
    const result2 = await request.query(`SELECT * FROM dbo.BestEmployee(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`);
    const result1 = await sql.query(`SELECT * FROM dbo.BestSeller(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`);
    res.render('tongquan.ejs', { intValue: value, dulieu1: result1.recordset, dulieu2: result2.recordset })
})
router.post('/tongquan/topbanchay', async (req, res) => {
    const batdau = req.body.start1;
    const ketthuc = req.body.start2;
    const request = new sql.Request();
    request.input('start', sql.NVarChar, batdau);
    request.input('end', sql.NVarChar, ketthuc);
    const result = await request.query(`SELECT * FROM dbo.BestSeller(@start, @end)`);
    const result1 = await request.query(`SELECT * FROM dbo.BestEmployee(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`);
    res.render('tongquan.ejs', { intValue: 0, dulieu2: result1.recordset, dulieu1: result.recordset })

})
router.post('/tongquan/topnhanvien', async (req, res) => {
    const batdau = req.body.end1;
    const ketthuc = req.body.end2;
    const request = new sql.Request();
    request.input('start', sql.NVarChar, batdau);
    request.input('end', sql.NVarChar, ketthuc);
    const result = await request.query(`SELECT * FROM dbo.BestEmployee(@start, @end)`);
    const result1 = await sql.query(`SELECT * FROM dbo.BestSeller(CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`);
    res.render('tongquan.ejs', { intValue: 0, dulieu1: result1.recordset, dulieu2: result.recordset })
})
export default router;
