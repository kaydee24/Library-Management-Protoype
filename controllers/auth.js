const mysql = require("mysql");
//created a connection
const db=mysql.createConnection({

    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: 5001,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});



exports.register=(req,res)=>{
//take all the data
    console.log(req.body);

    //const name=req.body.name;
    // const email=req.body.email;
    //const password=req.body.password;
    //const passwordconfirm=req.body.password;

//destrcutor
    const {name, email, password, passwordconfirm} = req.body;

    db.query('SELECT email FROM users WHERE email = ?' , [email], (error,results)=>{

        if(error){
            console.log(error);

        }
        else{

            //means already same email exists

            if(results.length>0){
                return res.render('register', {
                    message: 'That email is already in use'
                })
            }
            
            else if(password!=passwordconfirm){

                return res.render('register', {
                    message: 'Passwords dont match'
                })

            }


        }


    })


    //show on frontend
   // res.send("Form Submitted");
}