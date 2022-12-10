var request = require('request-promise');
async function commspy(){
    var data="https://www.youtube.com/watch?v=wa_ZB7jv-TE";


var options={
    method:'POST',
    uri:'http://127.0.0.1:5000/commspy',
    body:data,
    json:true
};

var sendrequest = await request(options)
  
// The parsedBody contains the data
// sent back from the Flask server 
.then(function (parsedBody) {
    console.log(parsedBody);
      
    // You can do something with
    // returned data
    let result;
    result = parsedBody['result'];
    console.log("Sum of Array from Python: ", result);
})
.catch(function (err) {
    console.log(err);
});
}

commspy();