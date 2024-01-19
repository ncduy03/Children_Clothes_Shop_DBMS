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

router.post("/doitac/add", async (req, res) => {
    const Ten = req.body.ten;
    const Phone = req.body.phone;
    const Address = req.body.address;
    const Email = req.body.email;
    const request = new sql.Request();
    request.input('name', sql.NVarChar, Ten);
    request.input('SDT', sql.NVarChar, Phone);
    request.input('diachi', sql.NVarChar, Address);
    request.input('email', sql.NVarChar, Email);
    const result = await request.query(`
    EXEC AddManufacturer 
    @manufacturer_name = @name, 
    @phone = @SDT, 
    @address = @diachi, 
    @email = @email
`);
    if (result) console.log("Trueeee");
    const result1 = await sql.query(`SELECT * FROM Manufacturer`);
    res.render('doitac', { dulieu: result1.recordset });
})

router.get("/doitac/add", async (req, res) => {
    const result = await sql.query(`SELECT * FROM Manufacturer`);
    res.render('doitac', { dulieu: result.recordset });
})

router.post('/doitac/chinhsua', async (req, res) => {
    try {
        const manufacturerId = req.body.manufacturerId;
        const newName = req.body.newName;
        const newPhone = req.body.newPhone;
        const newAddress = req.body.newAddress;
        const newEmail = req.body.newEmail;

        const request = new sql.Request();
        request.input('manufacturer_id', sql.NVarChar, manufacturerId);
        request.input('new_name', sql.NVarChar, newName);
        request.input('new_phone', sql.NVarChar, newPhone);
        request.input('new_address', sql.NVarChar, newAddress);
        request.input('new_email', sql.NVarChar, newEmail);

        const result = await request.query(`
            EXEC UpdateManufacturer
            @manufacturer_id = @manufacturer_id, 
            @manufacturer_name = @new_name, 
            @phone = @new_phone,
            @address = @new_address,
            @email = @new_email
        `);

        if (result) console.log("Manufacturer details updated successfully");
        const updatedResult = await sql.query(`SELECT * FROM Manufacturer`);
        res.render('doitac', { dulieu: updatedResult.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// Route xử lý lấy thông tin đối tác để hiển thị trong modal
router.post('/doitac/chinhsua/info', async (req, res) => {
    try {
        const manufacturerId = req.body.manufacturerId;
        const request = new sql.Request();
        request.input('manufacturer_id', sql.NVarChar, manufacturerId);
        const result = await request.query(`SELECT * FROM Manufacturer WHERE manufacturer_id = @manufacturer_id`);
        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
