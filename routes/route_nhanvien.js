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
    const result1 = await sql.query(`SELECT * FROM Employee`);
    res.render('nhanvien', { dulieu: result1.recordset });
})

router.post("/nhanvien/xoa", async (req, res) => {
    const Xoa = req.body.xoa;
    const request = new sql.Request();
    request.input('phone', sql.NVarChar, Xoa);
    const result = await request.query(`EXEC DeleteEmployee @phone = @phone`);
    if (result) console.log("Trueeee");
    const result1 = await sql.query(`SELECT * FROM Employee`);
    res.render('nhanvien', { dulieu: result1.recordset });
})
export default router;
