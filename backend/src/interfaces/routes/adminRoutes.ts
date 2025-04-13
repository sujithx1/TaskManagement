


import express from "express"
import { createAccesstoken } from "../../configs/jwt";
import { admincontroller } from "../dependency injection/admin_di";
import { authenticateAccessToken } from "../middlewares/jwtauthentication";
const router=express.Router()


router.post('/refresh-token', (req, res) => {
   
    createAccesstoken(req,res,"admin")
  });


  router.get('/users',
        // authenticateAccessToken,          // validate JWT
    (req,res,next)=>{
    admincontroller._getusers(req,res,next)
  })
  router.post('/task',  
        // authenticateAccessToken,          // validate JWT
    (req,res,next)=>{
    admincontroller._createnewtask(req,res,next)
  })
  router.get('/tasks',  
        // authenticateAccessToken,          // validate JWT
    (req,res,next)=>{
    admincontroller._gettasks(req,res,next)
  })
  router.put('/task/:id',  
        // authenticateAccessToken,          // validate JWT
    (req,res,next)=>{
    admincontroller._updateTasks(req,res,next)
  })

  export default router