import { Request, Response } from 'express';
import * as mongoose from 'mongoose';
import Blog from '../models/blog';


export class BlogRoute {
    private uri = '/api/v1/blog';

    public blogRoute(app: any): void {

    app.route(this.uri).get((req: Request, res: Response) => {
        try {
            Blog.find((err, data) => {
                if (!err) {
                    res.send({success: true, data: data})
                } else {
                    console.log(err.message);
                    return res.send({success: false, error: err.message});
                }
            }).sort({datePublished: -1});
        } catch (err) {
            console.log(err.message);
            return res.send({success: false, error: err.message});
        }
    });

    app.route(`${this.uri}/:id`).get((req: Request, res: Response) => {
        try {
            Blog.findById(req.params.id, (err, data) => {
                if (!err) {
                    res.send({success: true, data: data})
                } else {
                    console.log(err.message);
                    return res.send({success: false, error: err.message});
                }
            });
        } catch (err) {
            console.log(err.message);
            return res.send({success: false, error: err.message});
        }
    });

    app.route(`${this.uri}/blog/:title`).get((req: Request, res: Response) => {
        try {
            Blog.find({'title': req.params.title}, (err, data) => {
                if (!err) {
                    res.send({success: true, data: data})
                } else {
                    console.log(err.message);
                    return res.send({success: false, error: err.message});
                }
            });
        } catch (err) {
            console.log(err.message);
            return res.send({success: false, error: err.message});
        }
    });

    app.route(this.uri).post((req: Request, res: Response) => {
        try {
            Blog.create(req.body, (err, data) => {
                if (!err) {
                    res.send({success: true, data: data})
                } else {
                    console.log(err.message);
                    return res.send({success: false, error: err.message});
                }
            });
        } catch (err) {
            return res.send({success: false, error: err.message});
        }
    });

    app.route(`${this.uri}/:id`).put( async (req: Request, res: Response) => {
        console.log(req.body);
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({success: false, message: 'Invalid blog id!'});
        }

        let searchBlog = await Blog.findById(req.params.id);
        if (!searchBlog) return res.status(400).json({success: false, message: 'Cannot find blog with su ID'});

        if(req.body.title !== "") {
            try {
                const updateBlog = await Blog.findByIdAndUpdate( 
                    req.params.id, 
                    {
                        title: req.body.title,
                        content: req.body.content,
                        metaTitle: req.body.metaTitle,
                        metaDescription: req.body.metaDescription
                    }, {new: true}
                );
    
                if (!updateBlog) return res.status(404).json({success: false, message: 'Oops something went wrong..'});
    
                res.json({success: true, message: updateBlog});
    
            } catch (err) {
                res.status(500).json({success: false, error: err.message});
            }
        } else {
            res.status(500).json({success: false, error: 'Blog title is required.'});
        }
    });

    app.route(`${this.uri}/:id`).delete(async (req: Request, res: Response) => {
        if(!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({success: false, message: 'Invalid blog id!'});
        }

        try {
            const deleteBlog =  await Blog.findByIdAndRemove(req.params.id);

            if(!deleteBlog) return res.status(404).json({success: false, message: 'Can not find blog to delete.'});

            res.json({success: true, message: 'Blog deleted successfully.'});
        } catch (err) {
            res.status(500).json({success: false, error: err.message});
        }
    });
   }
}