const http = require('http');
const PORT = 8000;

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
        
    const url = req.url;
    const method = req.method;

    if(url === "/"){
        res.writeHead(200,{'Content-Type': 'application/json'});
        res.write("Hello From The Other Side");

        res.end(JSON.stringify(database.users));
    }


    else if(url === "/login" && method ==="POST"){
        
        let data ="";
        req.on("data",function(chunk){
            data+=chunk;
        })
        
        req.on("end",function(){      
           
            const jsondata = JSON.parse(data);
            let found = false;  
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
            if(!found){
                res.writeHead(400,{'Content-Type': 'text/html'});
                res.write(JSON.stringify("Error Logging In."));
                res.end();
            }   
        })
    }



    else if(url === "/register" && method ==="POST"){

        let data ="";
        req.on("data",function(chunk){
            data+=chunk;
        })

        req.on("end",()=>{
            const jsondata = JSON.parse(data);
            console.log(jsondata);
            database.users.push({
                id:jsondata.id,
                name:jsondata.name,
                email:jsondata.email,
                password:jsondata.password
            })
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.write(JSON.stringify(database.users[database.users.length-1]));
            res.end();
        })
        
    }


    else{
        res.writeHead(404,{'Content-Type': 'text/html'});
        res.write("404 ERROR PAGE. PAGE DOESN't EXIT");
        res.end();
    }

}
);



server.listen(PORT, "127.0.0.1", () => {
    console.log(`Listening To Port No.: ${PORT}`);
})