const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(express.static('./assets'));
app.use(expressLayouts);
//extract style and scripts from subpages into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use express router
app.use('/', require('./routes/index'));

//setup the view engine
app.set('view engine','ejs');
app.set('views', './views');



app.listen(port, function(err){
    if(err){
        
        console.log(`Error in Running the server: ${err}`);
    }

    console.log(`Server is running on port : ${port} `);
});