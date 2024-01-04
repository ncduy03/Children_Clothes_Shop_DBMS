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
    database: "GIANGVIEN",
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

// Middleware để xử lý dữ liệu POST dưới dạng JSON

// Endpoint POST để lấy dữ liệu từ cơ sở dữ liệu
app.get('/nhanvien', async (req, res) => {
    // Thực hiện truy vấn SQL để lấy dữ liệu từ cơ sở dữ liệu
    const result = await sql.query('SELECT * FROM ThamGia');
    console.log(result);
    // Gửi dữ liệu đến file EJS để hiển thị
    res.render('nhanvien', { dulieu: result.rows });
}

);
/*app.get('/nhanvien', (req, res) => {
    res.render('nhanvien.ejs');
})

/*app.post('/nhanvien', (req, res) => {
    const singleData = {
        MaGV: '001',
        MaDT: 'John Doe',
        SoGio: 'Manager'
    };

    res.render('nhanvien', { singleData });
});*/
app.get('/themnhanvien', async (req, res) => {

    // Thiết lập thông tin kết nối

    // Tạo một pool kết nối
    pool = await sql.connect(config);

    // Thực hiện truy vấn SQL để lấy dữ liệu từ bảng
    const result = await pool.query('SELECT * FROM Customer;');

    // Render trang HTML với dữ liệu lấy từ cơ sở dữ liệu
    res.send(`<html><body><table border="1"><tr><th>ID</th><th>Name</th><th>Category</th></tr>${result.recordset.map(row => `<tr><td>${row.customer_id}</td><td>${row.name}</td><td>${row.phone}</td></tr>`).join('')}</table></body></html>`);

});


app.get('/tongquan', (req, res) => {
    res.render('tongquan.ejs');
})




app.get('/doitac', (req, res) => {
    res.render('doitac.ejs');
})

/*app.post('/nhanvien', async (req, res) => {

    let inputData;
    inputData = req.body.input_data;
    console.log(inputData);
    /*let ketqua = await db.query('EXEC FindManufacturerByName @searchName', {
        searchName: inputData
    });
    let result;
    result = await long.query(`SELECT * FROM Manufacturer`);
    //res.send(`<html><body><table border="1"><tr><th>ID</th><th>Name</th><th>Category</th></tr>${result.recordset.map(row => `<tr><td>${row.manufacturer_id}</td><td>${row.manufacturer_name}</td><td>${row.phone}</td></tr>`).join('')}</table></body></html>`);
    //console.log(result);
    res.redirect('nhanvien', { dulieu: result.rows });


});*/


app.get('/giaodich', (req, res) => {
    res.render('giaodich.ejs');
})

app.get('/kiemkho', (req, res) => {
    res.render('kiemkho.ejs');
})

/*app.get('/themnhanvien', (req, res) => {
    res.render('themnhanvien.ejs');
})
*/
app.get('/thietlapgia', (req, res) => {
    res.render('thietlapgia.ejs');
})
/*app.get('/tongquan', (req, res) => {
    res.sendFile(__dirname + '/public/tongquan.html'); // Adjust the path as needed
});

app.get('/doitac', (req, res) => {
    res.sendFile(__dirname + '/public/doitac.html'); // Adjust the path as needed
});

app.get('/giaodich', (req, res) => {
    res.sendFile(__dirname + '/public/giaodich.html'); // Adjust the path as needed
});

app.get('/kiemkho', (req, res) => {
    res.sendFile(__dirname + '/public/kiemkho.html'); // Adjust the path as needed
});

app.get('/nhanvien', (req, res) => {
    res.sendFile(__dirname + '/public/nhanvien.html'); // Adjust the path as needed
});

app.get('/themnhanvien', (req, res) => {
    res.sendFile(__dirname + '/public/themnhanvien.html'); // Adjust the path as needed
});

app.get('/thietlapgia', (req, res) => {
    res.sendFile(__dirname + '/public/thietlapgia.html'); // Adjust the path as needed
});

*/




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
