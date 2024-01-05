import express from "express";
import sql from "mssql";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const config = {
    user: "sa",
    password: "123456",
    server: "localhost",
    database: "ChildrenShopDBMS",
    port: 1433, // Port mặc định của SQL Server
    options: {
        encrypt: false, // Nếu bạn sử dụng kết nối mật, đặt giá trị này thành true
    },
};
sql.connect(config, (err) => {
    if (err) {
        console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
    } else {
        console.log('Đã kết nối đến cơ sở dữ liệu');
    }
});

app.post('/nhanvien', async (req, res) => {
    let InputData;
    InputData = req.body.input_data;
    console.log(InputData);
    // Thực hiện truy vấn SQL để lấy dữ liệu từ cơ sở dữ liệu
    //console.log(`EXEC dbo.FindEmployeesByName @searchName = '${InputData}'`);
    const result = await sql.query('EXEC dbo.FindEmployeesByName @searchName', [{
        searchName: InputData, type: sql.NVarChar, value: InputData
    },]);
    res.render('nhanvien');
})

app.get('/nhanvien', async (req, res) => {
    const result = await sql.query(`SELECT * FROM Employee`);

    res.render('nhanvien', { dulieu: result.recordset });
})


app.get('/tongquan', (req, res) => {
    res.render('tongquan.ejs');
})

app.get('/doitac', async (req, res) => {
    const result = await sql.query(`SELECT * FROM Manufacturer`);

    res.render('doitac', { dulieu: result.recordset });
})

app.get('/giaodich', (req, res) => {
    res.render('giaodich.ejs');
})

app.get('/kiemkho', async (req, res) => {
    const result = await sql.query(`SELECT * FROM Product`);

    res.render('kiemkho', { dulieu: result.recordset });
})

app.post('/kiemkho', async (req, res) => {
    // Thực hiện truy vấn SQL để lấy dữ liệu từ cơ sở dữ liệu
    /*const result = await sql.query('EXEC FindProductsByCategoryName @category_name', [{
        category_name: InputData, type: sql.NVarChar(50), value: InputData
    },]);*/
    const request = new sql.Request();
    const inputData = req.body.input_data2;
    request.input('InputData', sql.NVarChar, inputData);
    const result = await request.query('EXEC FindProductsByCategoryName @InputData');
    console.log(result);
    res.render('kiemkho', { dulieu: result.recordset });
}
)
/*app.get('/themnhanvien', (req, res) => {
    res.render('themnhanvien.ejs');
})
*/
app.get('/thietlapgia', (req, res) => {
    res.render('thietlapgia.ejs');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
