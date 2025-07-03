import express from 'express';
import {
    GetAllShortLinks,
    RedirectToUrl,
    ShortenUrls,
    UrlAnalytics,
    deleteShortUrl
} from '../Controllers/url.js';
import { AuthMiddleware } from '../Middleware/Auth.js';

const urlRouter = express.Router()

urlRouter.post('/short', AuthMiddleware, ShortenUrls)
urlRouter.get('/shortLinks', AuthMiddleware, GetAllShortLinks)
urlRouter.get('/analytic/:shortid', UrlAnalytics)
urlRouter.get('/:shortid', RedirectToUrl)
urlRouter.delete('/:shortid', deleteShortUrl)

export default urlRouter