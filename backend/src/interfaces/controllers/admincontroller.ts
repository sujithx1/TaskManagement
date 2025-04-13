import { NextFunction, Request, Response } from "express";
import { Getusers_useCase } from "../../application/use-cases/adminside/getusers";
import { CreateTask_useCase } from "../../application/use-cases/adminside/createtask";
import { EditTasks_useCase } from "../../application/use-cases/adminside/edittask";
import { GetAllTasks_useCase } from "../../application/use-cases/adminside/getalltasks";
import { AppError } from "../../configs/apperror";
import { ErrorCodes } from "../../configs/errorcodes";



export class Admincontroller{
    constructor(
        private getusers:Getusers_useCase,
        private createTask:CreateTask_useCase,
        private getTasks:GetAllTasks_useCase,
        private updateTask:EditTasks_useCase
        
    ) {
        
    }

    async _getusers (req: Request, res: Response,next:NextFunction){
        try {
          const users = await this.getusers.execute()
          res.status(200).json({ message: "success get users", users });
        } catch (err) {
         return next(err)
        }
      };


    async _createnewtask (req: Request, res: Response,next:NextFunction){
        const { title,
            description,
            dueDate,
            priority,
            assignedTo,
            checklist,
            attachments}=req.body 
            
            
            
            try {
                    if(!title||
                        !description||
                        !dueDate||
                        !priority||
                        !assignedTo||
                        !checklist)
                        return next(new AppError(ErrorCodes.ValidationError,404))
          const task = await this.createTask.execute({title,
            description,
            dueDate,
            priority,
            assignedTo,
            checklist,
            })

          res.status(200).json({success:true, message: "User created", task });
        } catch (err) {
          return next(err)
        }
      };

      async _gettasks (req: Request, res: Response,next:NextFunction){   
        try {
            const tasks=await this.getTasks.execute()
          res.status(200).json({success:true, message: "User created", tasks });
        } catch (err) {
          return next(err)
        }
      };
      async _updateTasks (req: Request, res: Response,next:NextFunction){   
        try {
            const { title,
                description,
                dueDate,
                priority,
                assignedTo,
                checklist,
                }=req.body 
                
                
                if(!title||
                    !description||
                    !dueDate||
                    !priority||
                    !assignedTo||
                    !checklist
                    )
                return next(new AppError(ErrorCodes.ValidationError,404))
                const {id}=req.params
                if(!id) return next(new AppError(ErrorCodes.Id_Missing,404))

            const task=await this.updateTask.execute({id,title,
                description,
                dueDate,
                priority,
                assignedTo,
                checklist,
                })
          res.status(200).json({success:true, message: "User created", task });
        } catch (err) {
          return next(err)
        }
      };




}