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

router.get("/hanghoa/them", async (req, res) => {
    const result = await sql.query(`SELECT TOP 100 p.product_id, p.name, p.inbound_price, p.outbound_price, p.quantity, pc.category_name FROM Product p JOIN Product_category pc ON p.product_category_id = pc.product_category_id`);
    res.render('hanghoa', { dulieu: result.recordset });
})

router.post("/hanghoa", async (req, res) => {
    const request = new sql.Request();
    const inputData1 = req.body.input_data1;
    const inputData2 = req.body.input_data2;
    const inputData3 = req.body.input_data3;
    if (inputData1) {
        request.input('InputData', sql.NVarChar, inputData1);
        const result = await request.query(`EXEC FindProductsByCategoryName @InputData`);
        res.render('hanghoa', { dulieu: result.recordset });
    }
    else if (inputData2) {
        request.input('InputData', sql.NVarChar, inputData2);
        const result = await request.query(`EXEC FindProductByID @InputData`);
        res.render('hanghoa', { dulieu: result.recordset });
    }
    else if (inputData3) {
        request.input('InputData', sql.NVarChar, inputData3);
        const result = await request.query(`EXEC FindProductByName @InputData`);
        res.render('hanghoa', { dulieu: result.recordset });
    }
    else {
        const result = await sql.query(`SELECT p.product_id, p.name, p.inbound_price, p.outbound_price, p.quantity, pc.category_name FROM Product p JOIN Product_category pc ON p.product_category_id = pc.product_category_id`);
        res.render('hanghoa', { dulieu: result.recordset });
    }
});

router.post('/hanghoa/them', async (req, res) => {
    try {

        const Ten = req.body.ten;
        const PhanLoai = req.body.phanLoai;
        const GiaNhap = req.body.giaNhap;
        const GiaBan = req.body.giaBan;
        const TonKho = req.body.tonKho;
        const request = new sql.Request();
        request.input('name', sql.NVarChar, Ten);
        request.input('category', sql.Int, PhanLoai);
        request.input('inbound', sql.Int, GiaNhap);
        request.input('outbound', sql.Int, GiaBan);
        request.input('quantity', sql.Int, TonKho);
        const result = await request.query(`
    EXEC AddProduct 
    @name = @name, 
    @inbound_price = @inbound, 
    @outbound_price = @outbound, 
    @quantity = @quantity, 
    @product_category_id = @category
`);
        if (result) console.log("Trueeee");
        const result1 = await sql.query(`SELECT TOP 100 p.product_id, p.name, p.inbound_price, p.outbound_price, p.quantity, pc.category_name FROM Product p JOIN Product_category pc ON p.product_category_id = pc.product_category_id ORDER BY p.product_id DESC`);
        res.render('hanghoa', { dulieu: result1.recordset });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


router.route('/hanghoa/xoa')
    .get(async (req, res) => {
        const result = await sql.query(`SELECT p.product_id, p.name, p.inbound_price, p.outbound_price, p.quantity, pc.category_name FROM Product p JOIN Product_category pc ON p.product_category_id = pc.product_category_id`);
        res.render('hanghoa', { dulieu: result.recordset });
    })
    .post(async (req, res) => {
        const productId = req.body.id;

        try {
            // Kết nối đến cơ sở dữ liệu
            await sql.connect(config);

            // Thực hiện xóa dữ liệu trong cơ sở dữ liệu (Bạn cần sửa câu lệnh SQL tương ứng)
            const result = await sql.query(`DELETE FROM Product WHERE product_id = ${productId}`);

            // Gửi phản hồi về trình duyệt
            res.json({ success: true, message: 'Xóa dữ liệu thành công.' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Có lỗi xảy ra khi xóa dữ liệu.' });
        } finally {
            sql.close();
        }
    });

router.post('/hanghoa/chinhsua', async (req, res) => {
    try {
        const productId = req.body.productId;
        const newName = req.body.newName;
        const newCategory = req.body.newCategory;
        const newInboundPrice = req.body.newInboundPrice;
        const newOutboundPrice = req.body.newOutboundPrice;
        const newQuantity = req.body.newQuantity;

        const request = new sql.Request();
        request.input('product_id', sql.NVarChar, productId);
        request.input('new_name', sql.NVarChar, newName);
        request.input('new_category', sql.Int, newCategory);
        request.input('new_inbound_price', sql.BigInt, newInboundPrice)
        request.input('new_outbound_price', sql.BigInt, newOutboundPrice)
        request.input('new_quantity', sql.Int, newQuantity)

        const result = await request.query(`
                EXEC UpdateProduct
                @product_id = @product_id, 
                @name = @new_name, 
                @product_category_id = @new_category,
                @inbound_price = @new_inbound_price,
                @outbound_price = @new_outbound_price,
                @quantity = @new_quantity
            `);

        if (result) console.log("Product details updated successfully");
        const updatedResult = await sql.query(`SELECT * FROM Product`);
        res.render('hanghoa', { dulieu: updatedResult.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Route xử lý lấy thông tin hàng hóa để hiển thị trong modal
router.post('/hanghoa/chinhsua/info', async (req, res) => {
    try {
        const productId = req.body.productId;
        const request = new sql.Request();
        request.input('product_id', sql.NVarChar, productId);
        const result = await request.query(`SELECT * FROM Product WHERE product_id = @product_id`);
        console.log(result.recordset[0]);
        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
