import express from 'express';
import { urlModel } from '../model/shortUrl';

export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
        console.log("the full url is ",req.body.fullUrl);
        const urlFound = await urlModel.find({fullUrl: req.body.fullUrl});
        if(urlFound.length > 0){
            res.status(409);
            res.send(urlFound);
        }else{
            const shortUrl = await urlModel.create({fullUrl: req.body.fullUrl});
            res.status(201).send(shortUrl);
        }
    } catch (error) {
        res.status(500).send({"message":"something went wrong"});
        
    }
}

export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrls = await urlModel.find().sort({createdAt: -1});  
        if (shortUrls.length < 0) {
            res.status(404).send({message:"No urls found"});   
        }else{
            res.status(200).send(shortUrls);
        }         
    } catch (error) {
        res.status(500).send({"message":"something went wrong"});
        
    }
}

export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shorUrl = await urlModel.findOne({shortUrl: req.params.id});
        if(!shorUrl){
            res.status(404).send({message:"FullUrl not found"});
    }else{
        shorUrl.clicks++;
        shorUrl.save();
        res.redirect(`${shorUrl.fullUrl}`);
    }
    
    } catch (error) {
        res.status(500).send({"message":"something went wrong"});
        
    }
};
export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shorUrl = await urlModel.findByIdAndDelete({_id: req.params.id});
        if(shorUrl){
            res.status(200).send({message:"Request deleted successfully"});
        }
    
    } catch (error) {
        res.status(500).send({"message":"something went wrong"});
        
    }
};
