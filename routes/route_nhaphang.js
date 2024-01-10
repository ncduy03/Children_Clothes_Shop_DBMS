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

router.post("/nhaphang", async (req, res) => {
    const request = new sql.Request();
    const inputData1 = req.body.input_data1;
    const inputData2 = req.body.input_data2;
    if (inputData1 && inputData2) {
        request.input('InputData1', sql.NVarChar, inputData1);
        request.input('InputData2', sql.NVarChar, inputData2);
        const result = await request.query(`EXEC FindInboundOrdersByTimePeriod @InputData1, @InputData2`);
        res.render('nhaphang', { dulieu: result.recordset });
    }
    else {
        const result = await request.query(`SELECT * FROM Inbound_Order`);
        res.render('nhaphang', { dulieu: result.recordset });
    }
});

router.post('/nhaphang/add', async (res, req) => {
    try {
        const id = req.body.id;
        const Ten = req.body.ten;
        const Time = req.body.thoi_gian;
        const Money = req.body.tien;
        const TrangThai = req.body.trangthai;
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        request.input('ThoiGian', sql.Int, Time);
        request.input('Tien', sql.Int, Money);
        request.input('Status', sql.Int, TrangThai);
        const result = await request.query(`
    EXEC AddProduct 
    @name = @name, 
    @inbound_price = @inbound, 
    @outbound_price = @outbound, 
    @quantity = @quantity, 
    @product_category_id = @category
`);
        if (result) console.log("Trueeee");
        const result1 = await sql.query(`SELECT p.product_id, p.name, p.inbound_price, p.outbound_price, p.quantity, pc.category_name FROM Product p JOIN Product_category pc ON p.product_category_id = pc.product_category_id`);
        res.render('hanghoa', { dulieu: result1.recordset });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
export default router;