import express from "express";
import sql from "mssql";
const router = express.Router()
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
router.post("/nhanvien", async (req, res) => {
    const request = new sql.Request();
    const inputData1 = req.body.input_data1;
    const inputData2 = req.body.input_data2;
    if (inputData1) {
        request.input('InputData', sql.NVarChar, inputData1);
        const result = await request.query(`EXEC FindEmployeesByName @InputData`);
        res.render('nhanvien', { dulieu: result.recordset });
    }
    else if (inputData2) {
        request.input('InputData', sql.NVarChar, inputData2);
        const result = await request.query(`EXEC FindEmployeesByRole @InputData`);
        res.render('nhanvien', { dulieu: result.recordset });
    }
    else {
        const result = await request.query(`SELECT * FROM Employee`);
        res.render('nhanvien', { dulieu: result.recordset });
    }
})


router.post("/nhanvien/add", async (req, res) => {
    const Name = req.body.ten;
    const Address = req.body.diachi;
    const Phone = req.body.phone;
    const Role = req.body.role;
    const request = new sql.Request();
    request.input('name', sql.NVarChar, Name);
    request.input('SDT', sql.NVarChar, Phone);
    request.input('diachi', sql.NVarChar, Address);
    request.input('role', sql.NVarChar, Role);
    const result = await request.query(`
    EXEC AddEmployee 
    @name = @name, 
    @address = @diachi, 
    @phone = @SDT, 
    @role = @role
`);
    if (result) console.log("Trueeee");
    const result1 = await sql.query(`SELECT * FROM Employee ORDER BY employee_id DESC`);
    res.render('nhanvien', { dulieu: result1.recordset });
})

router.post("/nhanvien/xoa", async (req, res) => {
    const Xoa = req.body.xoa;
    const request = new sql.Request();
    request.input('phone', sql.NVarChar, Xoa);
    const result = await request.query(`EXEC DeleteEmployee @phone = @phone`);
    if (result) console.log("Trueeee");
    const result1 = await sql.query(`SELECT * FROM Employee WHERE phone = ${Xoa}`);
    res.render('nhanvien', { dulieu: result1.recordset });
})
router.post('/nhanvien/chinhsua', async (req, res) => {
    try {
        const employeeId = req.body.employeeId;
        const newName = req.body.newName;
        const newPhone = req.body.newPhone;
        const newAddress = req.body.newAddress;
        const newRole = req.body.newRole;

        const request = new sql.Request();
        request.input('employee_id', sql.NVarChar, employeeId);
        request.input('new_name', sql.NVarChar, newName);
        request.input('new_phone', sql.NVarChar, newPhone);
        request.input('new_address', sql.NVarChar, newAddress);
        request.input('new_role', sql.NVarChar, newRole);

        const result = await request.query(
            `EXEC UpdateEmployee 
            @employee_id = @employee_id,
            @name = @new_name,
            @phone = @new_phone,
            @address = @new_address,
            @role = @new_role`
        );

        if (result) console.log("Employee details updated successfully");
        const updatedResult = await sql.query(`SELECT * FROM Employee`);
        res.render('nhanvien', { dulieu: updatedResult.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Route xử lý lấy thông tin nhân viên để hiển thị trong modal
router.post('/nhanvien/chinhsua/info', async (req, res) => {
    try {
        const employeeId = req.body.employeeId;
        const request = new sql.Request();
        request.input('employee_id', sql.NVarChar, employeeId);
        const result = await request.query(`SELECT * FROM Employee WHERE employee_id = @employee_id`);
        res.json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
export default router;
