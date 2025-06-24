import foodModel from "../models/foodmodels.js";
import fs from 'fs';

/// add foods

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })
    try{
         await food.save()
         res.json({success: true, message: "Food added Successfully"})
    }catch(error){
        console.log(error.message)
        return res.json({success: false, message: 'Error'});
    }
}

// all food list

const listFood = async( req, res) => {
  try{
    const food = await foodModel.find({});
    res.json({ success: true, data: food})
  } catch(error){
    console.log(error.message)
    res.json({success: false, message: 'Error'});
  }
}

// Remove Food Item 

const removeFood = async(req, res) => {
  try {
      const food = await foodModel.findById(req.body.id);
      fs.unlink(`uploads/${food.image}`, () => {});
      
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({success: true, message: "Food deleted successfully"});
  } catch (error) {
    console.log(error.message);
    res.json({success: false, message: 'Error'});
  }
}

export {addFood , listFood, removeFood};