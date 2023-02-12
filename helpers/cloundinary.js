var cloudinary = require('cloudinary');


cloudinary.config({ 
    cloud_name: "du7chovc0", 
    api_key: "769817316986182", 
    api_secret: "S7jdt06F3hO-3vCjHyyhjwj9EQI"
  });


  function uploads(file,folder){
     return new Promise(function(resolve, reject){
        cloudinary.uploader.upload(file,(result)=>{
            console.log(result);
            resolve({url:result.url,id:result.public_id},{
                folder:folder
            })
        })

     })


  }


  module.exports = uploads;