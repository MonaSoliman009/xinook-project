const nodemailer=require('nodemailer')

const sendEmail=async(email,subject,text)=>{

    try{
        const transporter=  nodemailer.createTransport({

            host:"smtp.gmail.com",
            service:"gmail",
            port:587,
            secure:false,
            auth:{
                user:"savethemiti@gmail.com",
                pass:"soljecscqgnwxskm"
            },
           tls:{
             rejectUnauthorized:false
           }
    
          })
    
         await transporter.sendMail({
            from:"savethemiti@gmail.com",
            to:email,
            subject:subject,
            text:text
          })
    }catch(err){

        console.log(err);
    }


}

module.exports=sendEmail