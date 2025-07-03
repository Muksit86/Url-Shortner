import { nanoid } from 'nanoid';
import urlModel from '../Models/url.model.js';

export const ShortenUrls = async (req, res) => {
   try {
    const url = req.body.url
    
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const shortid  = nanoid(7);
    const newUrl = new urlModel({redirectUrl:url, shortId:shortid, visitHistory:[], createdBy:req.user.id})
    await newUrl.save();
  
    res.status(201).json({shortid:shortid})

  } catch (error) {
    console.error(error)
    return res.status(500).json({message:"This is a ShortenUrls problem", Error:error});
  } 
}

export const UrlAnalytics = async (req, res) => {
  try {
    const shortId = req.params.shortid
    
  if (!shortId) {
      return res.status(400).json({ error: 'URL is required' });
  }
  const result = await urlModel.findOne({shortId})
  
  return res.json({"Click Count": result.visitHistory.length, Analytics:result.visitHistory})

} catch (err) {
  return res.status(501).json({ "There is some problem with RedirectToUrl function":err });
}
}

export const GetAllShortLinks = async (req, res) =>{
  try {
    const urls = await urlModel.find({createdBy: req.user.id})
  
    res.json({"urls":urls})
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
}

export const deleteShortUrl = async (req, res) =>{
  try {
    const shortid = req.params.shortid

    const deletedUrl = await urlModel.findOneAndDelete({shortId:shortid})
    return res.status(200).json({deletedUrl})

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
}

export const RedirectToUrl = async (req, res) => {
    try {
    const shortId = req.params.shortid
    
    if (!shortId) {
      return res.status(400).json({ error: 'URL is required' });
    }
    const shortUrl = await urlModel.findOneAndUpdate(
      {
        shortId
      },
      {
        $push:{
          visitHistory: {
            timestamp: Date.now()
          },
        }
      }
    )
    
    res.redirect(shortUrl.redirectUrl)

} catch (err) {
  return res.status(501).json({ "There is some problem with RedirectToUrl function":err });
}
}