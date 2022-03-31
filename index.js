const http = require('http');
const PORT = 8000;



//TEMPRORY DATABASE ARRAY OF OBJECT

const database = {
    users:[
        {
            id:"123",
            name:"Vimu",
            email:"vimu.kale@gmail.com",
            password:"MB2022",
        },
        {
            id:"456",
            name:"Ajinkya",
            email:"ajinkya@gmail.com",
            password:"MB2021",
        }
    ]
}



const server = http.createServer((req, res) => {
     
    //GET THE REQUEST URL
    const url = req.url;

    //GET THE REQUEST METHOD
    const method = req.method;

    //ROOT ROUTE
    if(url === "/"){
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.write("Hello From The Other Side");
        
        //SENDING USERS IN THE DB
        res.end(JSON.stringify(database.users));
    }


    //LOGIN ROUTE
    else if(url === "/login" && method ==="POST"){
        
        //STORING DATA IN data VARIABLE RECEIVED FROM THE REQUEST IN FORM OF CHUNKS
        let data ="";
        
        //ON METHOD BINDS AN EVENT TO A OBJECT
        req.on("data",function(chunk){
            data+=chunk;
        })
        
        //ON METHOD BINDS AN EVENT TO A OBJECT
        req.on("end",function(){      
            
            //PARSING DATA INTO JS OBJECT
            const jsondata = JSON.parse(data);
            
            //FLAG
            let found = false;  
            
            //FOR LOOP TO ITERATE OVER DB USERS FOR VALIDATION
            for(let i =0 ;i<database.users.length;i++){
                if(jsondata.email === database.users[i].email &&
                jsondata.password === database.users[i].password){
                        res.writeHead(200,{'Content-Type': 'text/html'});
                        res.write(JSON.stringify("success"));
                        res.end();    
                        found = true;
                        break;
                    }         
            }
            //IF USER NOT FOUND 
            if(!found){
                res.writeHead(400,{'Content-Type': 'text/html'});
                res.write(JSON.stringify("Error Logging In."));
                res.end();
            }   
        })
    }


    //REGISTER USER ROUTE
    else if(url === "/register" && method ==="POST"){

        let data ="";
        req.on("data",function(chunk){
            data+=chunk;
        })

        req.on("end",()=>{
            const jsondata = JSON.parse(data);
            console.log(jsondata);
            
            //PUSING NEW USER DETAILS TO THE DATABASE ARRAY OF OBJECT
            database.users.push({
                id:jsondata.id,
                name:jsondata.name,
                email:jsondata.email,
                password:jsondata.password
            })
            res.writeHead(200,{'Content-Type': 'application/json'});
            
            //RETURNING THE LAST(NEW) USER FROM THE DATABASE
            res.write(JSON.stringify(database.users[database.users.length-1]));
            res.end();
        })
        
    }

    //404 PAGE || IF ROUTES OR METHODS ARE WRONG
    else{
        res.writeHead(404,{'Content-Type': 'text/html'});
        res.write("404 ERROR PAGE. PAGE DOESN't EXIT");
        res.end();
    }

}
);



//SERVER LISTENING TO A PARTICULAR PORT
server.listen(PORT, "127.0.0.1", () => {
    console.log(`Listening To Port No.: ${PORT}`);
})
