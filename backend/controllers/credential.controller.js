import Credential from "../models/credentialModel.js";

export const addCredentialController = async (req, res) => {
    try {
        const credential = new Credential(req.body);
        await credential.save();
        res.status(201).json({ message: "Credential added successfully", credential });
    } catch (error) {
        res.status(500).json({ message: "Error adding credential", error: error.message });
    }
};

export const getCredentialController=async(req,res)=>{
    try{
        const data=await Credential.find();
        res.json({
            success:true,
            data:data
        })
    }catch(err){
        res.json({
            success:false,
            err:err?.message
        })
    }
}