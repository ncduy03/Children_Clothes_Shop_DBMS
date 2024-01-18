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
    EXEC AddCustomerOrder @ma, @trangthai, @nhanvien`);
        if (result) console.log("Trueeee");
        const result1 = await sql.query(`SELECT TOP 1000 c.name, FORMAT(co.total_price, 'N0') as TP, co.customer_order_id, co.order_date, co.status FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id ORDER BY co.customer_order_id DESC`);
        res.render('banhang', { dulieu: result1.recordset });
    }
    catch (error) {
        console.error(error);
        const result1 = await sql.query(`SELECT TOP 1000 c.name, FORMAT(co.total_price, 'N0') as TP, co.customer_order_id, co.order_date, co.status FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id ORDER BY co.customer_order_id DESC`);
        res.render('banhang', { dulieu: result1.recordset });
    }
});

router.post('/banhang', async (req, res) => {
    const request = new sql.Request();
    const check1 = req.body.checked1;
    const check2 = req.body.checked2;
    const inputData1 = req.body.input_data1;
    const inputData2 = req.body.input_data2;
    var Dk1 = null;
    if (check1) Dk1 = 'Đã thanh toán';
    if (check2) Dk1 = 'Đã hủy';
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


router.post('/banhang/chitiet', async (req, res) => {
    const receivedParam = req.body.customerOrderId;
    const request = new sql.Request();
    request.input('param', sql.Int, receivedParam);    // Perform necessary database queries or other operations
    // Assuming you have some data to send back
    const result = await request.query(`SELECT p.name as pname, cod.product_id, cod.quantity, co.customer_order_id, c.name as cname, c.phone, co.order_date, FORMAT(cod.price, 'N0') as TP FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id 
                                                                                                            JOIN Customer_Order_Detail cod ON co.customer_order_id = cod.customer_order_id 
                                                                                                            JOIN Product p ON cod.product_id = p.product_id WHERE cod.customer_order_id = @param`);
    //const result1 = await sql.query(`SELECT 1`)

    // Render the response using EJS
    res.json({ dulieu2: result.recordset });
});

router.post('/banhang/chitiet/add', async (req, res) => {
    const receivedParam = req.body.customerOrderId;
    const cus_detail_id = req.body.cusDetailId;
    const cus_detail_status = req.body.cusDetailStatus;
    console.log(receivedParam);
    console.log(cus_detail_id);
    console.log(cus_detail_status);

    const sqlQuery = `
    INSERT INTO Customer_Order_Detail(customer_order_id, product_id, quantity) 
    VALUES (${receivedParam}, ${cus_detail_id}, ${cus_detail_status})
  `;

    const result = await sql.query(sqlQuery);
    if (result) {
        const result1 = await sql.query(`SELECT 1`);
        const result = await sql.query(`SELECT TOP 1000 c.name, FORMAT(co.total_price, 'N0') as TP, co.customer_order_id, co.order_date, co.status FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id`);
        res.render('banhang', { customerOrderId: 0, dulieu: result.recordset, dulieu2: result1.recordset });
    }
})

router.post('/banhang/chitiet/xoa', async (req, res) => {
    const receivedParam = req.body.customerOrderId;
    const cus_detail_id = req.body.cusDetailId;
    const sqlQuery = `DELETE FROM Customer_Order_Detail WHERE customer_order_id = ${receivedParam} AND product_id = ${cus_detail_id}`;

    const result = await sql.query(sqlQuery);
    if (result) {
        const result1 = await sql.query(`SELECT 1`);
        const result = await sql.query(`SELECT TOP 1000 c.name, co.* FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id`);
        res.render('banhang', { customerOrderId: 0, dulieu: result.recordset, dulieu2: result1.recordset });
    }

})

router.post('/banhang/update', async (req, res) => {
    try {
        const customer_order_id = req.body.customer_order_idInput;
        const status = req.body.status;
        const request = new sql.Request();
        request.input('customer_order_id', sql.Int, customer_order_id);
        request.input('status', sql.NVarChar, status);
        console.log(customer_order_id);
        console.log(status);
        const result = await request.query(` EXEC UpdateCustomerOrder @customer_order_id, @status`);

        if (result) console.log("Product details updated successfully");
        const result1 = await sql.query(`SELECT TOP 1000 c.name, co.* FROM Customer c JOIN Customer_Order co ON c.customer_id = co.customer_id`);
        res.render('banhang', { dulieu: result1.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/banhang/chinhsua/info', async (req, res) => {
    try {
        const customer_order_id = req.body.customer_order_id;
        const request = new sql.Request();
        request.input('customer_order_id', sql.NVarChar, customer_order_id);
        const result = await request.query(`SELECT * FROM Customer_Order WHERE customer_order_id = @customer_order_id`);
        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
export default router;


