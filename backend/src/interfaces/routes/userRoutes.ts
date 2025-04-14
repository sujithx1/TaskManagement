import express from "express"
import { usercontroller } from "../dependency injection/user_di"
import { createAccesstoken } from "../../configs/jwt";
import {authenticateAccessToken } from "../middlewares/jwtauthentication";
// import { authenticateAccessToken, authorizeRoles } from "../middlewares/jwtauthentication";
const router=express.Router()


router.post('/refresh-token', (req, res) => {
   
    createAccesstoken(req,res,"user")
  });
  
router.post('/signup',(req,res,next)=>{
    usercontroller.register(req,res,next)
})

router.post('/login',(req,res,next)=>{
    usercontroller.login(req,res,next)
})
router.post('/logout/:id',(req,res,next)=>{
    console.log("logout",)
    
    usercontroller.logout(req,res,next)
})
router.get('/tasks/:id',
    authenticateAccessToken,
    (req,res,next)=>{

    
    usercontroller._getTasksbyUserId(req,res,next)
})
router.patch('/tasks/:taskId/update-status',
    authenticateAccessToken,
    (req,res,next)=>{

    
    usercontroller._patchTaskComplete(req,res,next)
})
router.put(
    '/edit/:id',
    authenticateAccessToken,          // validate JWT
    (req, res, next) => {
      usercontroller._edituser(req, res, next);
    }
  );


  
export default router