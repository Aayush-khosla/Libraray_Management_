import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())


const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"@ayush321",
  database:"book_project"
})

app.get("/",(req,res)=>{
    res.json("hello this the backend")
})




// this is the new book

app.get("/book",(req,res)=>{
    const q = "SELECT * FROM book"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books",(req,res)=>{
    const q = "INSERT INTO book (`id`,`name`,`cover`,`desc`,`category`) VALUES (?)"
    const value = [
        req.body.id,
        req.body.name,
        req.body.cover,
        req.body.desc,
        req.body.category,
    ]


    db.query(q,[value],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})  

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM book WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  

  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE book SET `name`= ?, `cover`= ?, `desc`= ?, `category`= ? WHERE id = ?";
  
    const values = [
      req.body.name,
      req.body.cover,
      req.body.desc,
      req.body.category,
      
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });  



//Student
app.get("/loginS",(req,res)=>{
    const q = "SELECT * FROM student "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        return res.json(data)
    })
})

app.post("/addstudent",(req,res)=>{
    const q = "INSERT INTO student (`id`,`name`, `email`, `password`) VALUES (?)"
    const value = [
        req.body.id,
        req.body.name,
        req.body.email,
        req.body.password
    ]


    db.query(q,[value],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}) 

app.delete("/student/:id", (req, res) => {
    const Id = req.params.id;
    const q = " DELETE FROM student WHERE id = ? ";
  
    db.query(q, [Id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  
  app.put("/student/:id", (req, res) => {
    const Id = req.params.id;
    const q = "UPDATE student SET name= ?, email= ?, password= ? WHERE id = ?";
  
    const values = [
      req.body.name,
      req.body.email,
      req.body.password,
    
    ];
  
    db.query(q, [...values, Id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });   




//login Admin
app.get("/loginA",(req,res)=>{
    const q = "SELECT * FROM admin "
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        console.log(data)
        return res.json(data)
    })
})

app.post("/addadmin",(req,res)=>{
    const q = "INSERT INTO admin (`id`,`name`,`password`) VALUES (?)"
    const value = [
        req.body.id,
        req.body.name,
        req.body.password,
        
    ]


    db.query(q,[value],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
}) 

app.delete("/admin/:id", (req, res) => {
  const Id = req.params.id;
  const q = " DELETE FROM admin WHERE id = ? ";

  db.query(q, [Id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/admin/:id", (req, res) => {
  const Id = req.params.id;
  const q = "UPDATE admin SET name= ?, password= ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.password,
   
  ];

  db.query(q, [...values, Id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});



/// student adding the issued req////// working

app.post("/addissue_req",(req,res)=>{
  const q = "INSERT INTO issue_a_book (bookid, studentid, req, approve, reject, comment) VALUES (?)"
  const value = [
      req.body.bookid,
      req.body.studentid,
      req.body.req,
      req.body.approve,
      req.body.reject,
      req.body.comment,
  ]

  console.log(value)


  db.query(q,[value],(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})



app.get("/studentReq/:id",(req,res)=>{

  const Id = req.params.id;
  const q = `SELECT
  book.id AS book_id,
  book.name AS book_name,
  book.desc AS book_description,
  book.cover AS book_cover,
  book.noofbook,
  book.category,
  issue_a_book.id AS issue_id,
  student.id AS student_id,
  student.name AS student_name,
  student.email,
  student.password,
  student.bookdata,
  student.booklimit,
  issue_a_book.req,
  issue_a_book.approve,
  issue_a_book.reject,
  issue_a_book.comment
FROM
  issue_a_book
JOIN student ON issue_a_book.studentid = student.id
JOIN book ON issue_a_book.bookid = book.id
WHERE
  student.id = ?;
`
    db.query(q,[Id],(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})


//    the admin can see the list  ////  working

app.get("/issued",(req,res)=>{
  const q = `SELECT
  issue_a_book.id AS issue_id,
    student.id AS student_id,
    student.name AS student_name,
    student.email,
    student.password,
    student.bookdata,
    student.booklimit,
    book.id AS book_id,
    book.name AS book_name,
    book.desc AS book_description,
    book.cover AS book_cover,
    book.noofbook,
    book.category,
    issue_a_book.req,
    issue_a_book.approve,
    issue_a_book.reject,
    issue_a_book.comment
FROM
    issue_a_book
JOIN student ON issue_a_book.studentid = student.id
JOIN book ON issue_a_book.bookid = book.id
WHERE
    issue_a_book.req = 1;`
    db.query(q,(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})


///////  admin approve the req /////////////    working

app.put("/approve/:id", (req, res) => {
  const Id = req.params.id;
  const q = "UPDATE issue_a_book SET comment= ?, req= 0 ,approve= 1 , reject= 0 WHERE id = ?";

  const values = [
    req.body.comment,
  ];

  db.query(q, [...values, Id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});   



////////////// admin reject //////////////////////////////   working :----- 
app.put("/reject/:id", (req, res) => {
  const Id = req.params.id;
  const q = "UPDATE issue_a_book SET comment= ?, req= 0 ,approve= 0 , reject =1 WHERE id = ?";

  const values = [
    req.body.comment,
  ];

  db.query(q, [...values, Id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});   


//updating the book limit of the student : - //working
app.put("/booklimit", (req, res) => {

  const q = "UPDATE student SET booklimit = booklimit - 1 WHERE id = ?;"

  const values = [
    req.body.id,
    
  ];

  db.query(q, [...values], (err, data) => { 
    if (err) return res.send(err);
    return res.json(data);
  });

});   

//updateting the book (noofbook)   //working
app.put("/noofbook", (req, res) => {
  
  const q = "UPDATE book SET noofbook = noofbook - 1 WHERE id = ?;"
  const values = [
    req.body.id,
    
  ];

  db.query(q, [...values], (err, data) => { 
    if (err) return res.send(err);
    return res.json(data);
  });

});

app.get("/admin/approve",(req,res)=>{
  const q = `SELECT
    issue_a_book.id AS issue_id,
    student.id AS student_id,
    student.name AS student_name,
    book.id AS book_id,
    book.name AS book_name,
    issue_a_book.comment
FROM
    issue_a_book
JOIN student ON issue_a_book.studentid = student.id
JOIN book ON issue_a_book.bookid = book.id
WHERE
    issue_a_book.approve = 1;`
    db.query(q,(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})

app.get("/admin/reject",(req,res)=>{
  const q = `SELECT
  issue_a_book.id AS issue_id,
  student.id AS student_id,
  student.name AS student_name,
  book.id AS book_id,
  book.name AS book_name,
  issue_a_book.comment
FROM
    issue_a_book
JOIN student ON issue_a_book.studentid = student.id
JOIN book ON issue_a_book.bookid = book.id
WHERE
    issue_a_book.reject = 1;`
    db.query(q,(err,data)=>{
      if(err) return res.json(err)
      return res.json(data)
  })
})



app.listen(8800,()=>{
    console.log("Server is working : ")
})