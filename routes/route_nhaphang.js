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
        const result = await sql.query(`SELECT m.manufacturer_name, io.inbound_order_id, FORMAT(io.total_price, 'N0') AS TP, io.order_date, io.status FROM Inbound_Order io JOIN Manufacturer m ON m.manufacturer_id = io.manufacturer_id`);
        res.render('nhaphang', { dulieu: result.recordset });
    }
});

router.post('/nhaphang/add', async (req, res) => {
    try {
        const id = req.body.ma;
        const TrangThai = req.body.trangthai;
        const request = new sql.Request();
        request.input('id', sql.Int, id);
        request.input('Status', sql.NVarChar, TrangThai);
        const result = await request.query(`
    EXEC AddInboundOrder 
    @manufacturer_id=@id,
    @status=@Status
`);
        if (result) console.log("Trueeee");
        const result1 = await sql.query(`SELECT m.manufacturer_name, io.inbound_order_id, FORMAT(io.total_price, 'N0') AS TP, io.order_date, io.status FROM Inbound_Order io JOIN Manufacturer m ON m.manufacturer_id = io.manufacturer_id`);
        res.render('test', { dulieu: result1.recordset });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/nhaphang/chitiet', async (req, res) => {
    const receivedParam = req.body.inboundOrderId;
    const request = new sql.Request();
    request.input('param', sql.Int, receivedParam);    // Perform necessary database queries or other operations
    // Assuming you have some data to send back
    const result = await request.query(`SELECT p.name as pname, iod.product_id, iod.quantity, io.inbound_order_id, m.manufacturer_name as mname, m.phone, io.order_date, p.inbound_price FROM Manufacturer m JOIN Inbound_Order io ON m.manufacturer_id = io.manufacturer_id 
                                        JOIN Inbound_Order_Detail iod ON io.inbound_order_id = iod.inbound_order_id 
                                        JOIN Product p ON iod.product_id = p.product_id WHERE iod.inbound_order_id = @param`);
    //const result1 = await sql.query(`SELECT 1`)

    // Render the response using EJS
    res.json({ dulieu2: result.recordset });
});

router.post('/nhaphang/chitiet/add', async (req, res) => {
    const receivedParam = req.body.inboundOrderId;
    const in_detail_id = req.body.inDetailId;
    const in_detail_status = req.body.inDetailStatus;
    console.log(receivedParam);
    console.log(in_detail_id);
    console.log(in_detail_status);
    const sqlQuery = `
    INSERT INTO Inbound_Order_Detail(inbound_order_id, product_id, quantity) 
    VALUES (${receivedParam}, ${in_detail_id}, ${in_detail_status})`;
    const result = await sql.query(sqlQuery);
    if (result) {
        const result1 = await sql.query(`SELECT 1`);
        const result = await sql.query(`SELECT m.manufacturer_name, io.inbound_order_id, FORMAT(io.total_price, 'N0') AS TP, io.order_date, io.status FROM Inbound_Order io JOIN Manufacturer m ON m.manufacturer_id = io.manufacturer_id`);
        res.render('nhaphang', { inboundOrderId: 0, dulieu: result.recordset, dulieu2: result1.recordset });
    }
})
router.post('/nhaphang/chitiet/xoa', async (req, res) => {
    const receivedParam = req.body.inboundOrderId;
    const in_detail_id = req.body.inDetailId;
    const sqlQuery = `DELETE FROM Inbound_Order_Detail WHERE inbound_order_id = ${receivedParam} AND product_id = ${in_detail_id}`;

    const result = await sql.query(sqlQuery);
    if (result) {
        const result1 = await sql.query(`SELECT 1`);
        const result = await sql.query(`SELECT m.manufacturer_name, io.inbound_order_id, FORMAT(io.total_price, 'N0') AS TP, io.order_date, io.status FROM Inbound_Order io JOIN Manufacturer m ON m.manufacturer_id = io.manufacturer_id`);
        res.render('nhaphang', { inboundOrderId: 0, dulieu: result.recordset, dulieu2: result1.recordset });
    }
})

export default router;