import { Request, Response, NextFunction, request, response } from 'express';
// import Blog  from '../app/shared/blog';
import Blog from '../models/blog';


export class BlogRoute {
    private uri = '/api/v1/blog';

    // private blog: Blog[] = [
    //     {
    //         title: 'Test Blog 1',
    //         content: 'This is the content of blgo 1.',
    //         metaTitle: 'Meta title 1',
    //         metaDescription: 'Meta desc 1',
    //       },
    //       {
    //         title: 'Test Blog 2',
    //         content: 'This is the content of blgo 2.',
    //         metaTitle: 'Meta title 2',
    //         metaDescription: 'Meta desc 2',
    //       },
    //       {
    //         title: 'Test Blog 3',
    //         content: 'This is the content of blgo 3.',
    //         metaTitle: 'Meta title 3',
    //         metaDescription: 'Meta desc 3',
    //       }
    // ];

   public blogRoute(app: any): void {

    app.route(this.uri).get((req: Request, res: Response) => {
        try {
            Blog.find((err, data) => {
                if (!err) {
                    res.send({success: true, data: data, gikan: 'server jud ni part!'})
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
                    res.send({success: true, data: data, gikan: 'server jud ni part!'})
                } else {
                    console.log(err.message);
                    return res.send({success: false, error: err.message});
                }
            });
        } catch (err) {
            return res.send({success: false, error: err.message});
        }
    });
   }
}