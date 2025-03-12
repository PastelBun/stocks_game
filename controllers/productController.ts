import { Request, Response, Router } from "express";
import Product from "../models/product";

const router: Router=Router();

router.post('/product', async (req: Request, res: Response) => {
    const data = new Product({
        name: req.body.name,
        amount: req.body.amount,
        price: req.body.price
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error})
    }
});
router.delete('/product/:id', async (req: Request, res: Response)=>{
  try{
      const id=req.params.id;
      await Product.findByIdAndDelete(id);
      const data=await Product.find();
      res.send(data);
  }
  catch (error){
      res.status(500).json({ message: error })
  }
})
router.put('/product/:id', async (req: Request, res: Response)=>{
    try{
        const id=req.params.id;
        const updatedData=req.body;
        const options={ new: true }

        const result=await Product.findByIdAndUpdate(
            id, updatedData, options
        );

        res.send(result);
    }
    catch (error){
        res.status(500).json({ message:error })
    }
})
export default router;