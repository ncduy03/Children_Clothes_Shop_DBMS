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

router.get("/banhang", async (req, res) => {
    const result = await sql.query(`SELECT c.name, co.* FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id`);
    res.render('banhang', { dulieu: result.recordset });
})
router.post("/banhang", async (req, res) => {
    const request = new sql.Request();
    const inputData1 = req.body.input_data1;
    const inputData2 = req.body.input_data2;
    const Ten = req.body.ten;
    const PhanLoai = req.body.phanLoai;
    const GiaNhap = req.body.giaNhap;
    const GiaBan = req.body.giaBan;
    const TonKho = req.body.tonKho;
    if (inputData1 && inputData2) {
        request.input('InputData1', sql.Date, inputData1);
        request.input('InputData2', sql.Date, inputData2);
        const result = await request.query(`EXEC FindCustomerOrdersByTimePeriod @InputData1, @InputData2`);
        res.render('banhang', { dulieu: result.recordset });
    }
    else if (Ten) { //&& req.body.phanLoai && req.body.giaNhap && req.body.giaBan && req.body.tonKho) {

        request.input('Ten', sql.NVarChar, Ten);
        request.input('PhanLoai', sql.NVarChar, PhanLoai);
        request.input('GiaNhap', sql.NVarChar, GiaNhap);
        request.input('GiaBan', sql.NVarChar, GiaBan);
        request.input('TonKho', sql.NVarChar, TonKho);

        const result = await request.query(`
                INSERT INTO Product ( name, inbound_price, outbound_price, quantity, product_category_id)
                VALUES (@Ten, @PhanLoai, @GiaNhap, @GiaBan,@TonKho)
            `);
        console.log("Done!");
    }
    /*if (inputData1) {
        request.input('InputData', sql.NVarChar, inputData1);
        const result = await request.query(`EXEC FindCustomerOrdersByStatus @InputData`);
        res.render('banhang', { dulieu: result.recordset });
    }*/

});

export default router;


