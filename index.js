var sf = require('node-salesforce');

require('dotenv').config();
var username = process.env.username;
var password = process.env.password;
     var   fname = "Pournima";
     var   lname = "Mishra";
     var   email="mishra.pournima108@gmail.com";
      var  company="hexaware";
     var   phone=process.env.phone;
var conn = new sf.Connection({
    oauth2 : {
        clientId : process.env.clientId,
        clientSecret : process.env.clientSecret,
        redirectUri : 'https://34d0e48d.ngrok.io',

      }//outh process
});


conn.login(username, password, function(err, userInfo) {
    console.log("connection");
    if (err) { return console.error(err); }
    else{
        console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property 
    console.log(JSON.stringify(userInfo));
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId)

     conn.sobject("Account").create({Name : 'My Account #1' }, function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log("Created record id : " + ret.id);
      });//create account


     conn.sobject("Lead").create({ FirstName: "Proxy", LastName: "Mishra", Email: "pournima108@gmail.com",Company: "hexaware", Phone: "887755443322"}, function(err, ret) {
            if (err || !ret.success) { 
               console.log(error)
               
            } else {
                console.log(JSON.stringify(ret))
                console.log("done")
               
            }
     })//create lead


      conn.sobject("Contact").create({FirstName: "Pourab", LastName: "Karchaudhuri",Phone:"8983888888", AccountId:process.env.AccountId}, function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log("Created record id : " + ret.id);
      });//create contact


      conn.sobject("Case").create({Type: "Question", Origin: "Phone", Reason:"link not connected",Priority:"Medium",AccountId:"0017F00000fQljJQAS",ContactId:process.env.ContactId,SuppliedName:"Link distruption"}, function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log("Created case id : " + ret.id)
      });//create case


    var records = [];
    conn.query("SELECT Id, Name FROM Account", function(err, result) {
        console.log(result)
         if (err) { return console.error(err); }
         console.log("total : " + result.totalSize);
        console.log("fetched : " + result.records.length);
        console.log("done ? : " + result.done);
        if (!result.done) {
        console.log("next records URL : " + result.nextRecordsUrl);
        }
    });//search records 

  

var description="link not connected"
    conn.sobject("Case")
        .find({Reason: "link is not connected"}) 
        .execute(function(err, records) {
        if(err){
            console.log(error);
        }else{
            if(records=[]){
                console.log("There is no such case present");
            }
            else{
            conn.sobject("Case").create({Type: "Question", Origin: "Phone", Reason:"link not connected",Priority:"Medium",AccountId:"0017F00000fQljJQAS",ContactId:"0037F00000WkJwfQAF",SuppliedName:"Link distruption"}, function(err, ret) {
                if (err || !ret.success) { return console.error(err, ret); }
                console.log("Created case id : " + ret.id)
          });}

           console.log("Case Details :inner loop " + JSON.stringify(records));
        }
    });//find case by case number

    conn.sobject("Contact")
    .find({Phone:phone}) 
    .execute(function(err, records) {
    if(err){
        console.log(error);
    }else{
        conn.sobject("Case")
        .find({IsClosed: false}) 
        .execute(function(err, records) {
            if(err){
            console.log(error);
            }else{
           console.log("Case Details :is the " + JSON.stringify(records));
            }
    });//find case
        console.log("Contact Details : " + JSON.stringify(records));
    }
});//find contact by contact number
        
   }

}
)


