import * as mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
     title: {
         type: String,
         required: true
     },
     content: {
         type: String,
         required: true
     },
     metaTitle: {
         type: String
     },
     metaDescription: {
         type: String
     },
     author: {
         type: String
     },
     datePublished: {
         type: Date,
         default: Date.now()
     }
});

BlogSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

BlogSchema.set('toJSON', {
    virtuals: true
});

export default mongoose.model('Blog', BlogSchema);