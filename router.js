const express = require('express');
const route = express.Router();
var accounts = require("./database")


// GET request
route.get("/accounts",(req,res)=>{
    res.json({userData:accounts});
})

// POST request
route.post("/accounts",(req,res)=>{
    const incomingAccount = req.body;
    accounts.push(incomingAccount);
    res.send(accounts)
})
//For getting the value through id
route.get("/accounts/:id",(req,res)=>{
    const accountId=Number(req.params.id);
    const getAccount = accounts.find((account)=> account.id === accountId);

    if(!getAccount){
        res.status(500).send("Account not found")
    }
    else{
        // console.log(res.json({userData:[getAccount]}));
        res.json({userData:[getAccount]});
    }
});

// PUT request
route.put("/accounts/:id",(req,res)=>{
    const accountid=Number(req.params.id);
    const body = req.body;
    const account = accounts.find((account)=>account.id === accountid);
    const index = accounts.indexOf(account);

    if(!account){
        res.status(500).send("Account Not Found!!");
    }
    else{
        const updatedAccount = {...account, ...body};
        // console.log({...account,...body});
        accounts[index]=updatedAccount;
        // res.end();
        res.send(updatedAccount)
    }

})

//DELETE request
route.delete("/accounts/:id",(req,res)=>{
    const accountid=Number(req.params.id)
    const newAccounts=accounts.filter((account)=>account.id != accountid)

    if(!newAccounts){
        res.status(500).send("Account Not Found & Can't Be Deleted")
    }
    else{
        accounts = newAccounts;
        res.send(accounts);
        console.log(newAccounts);
    }
})
module.exports=route;