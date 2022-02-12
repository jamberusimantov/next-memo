import type { NextApiRequest, NextApiResponse } from 'next'
import Memos from '../../dir/mongoDB/Memos';
import { response, memo } from '../../dir/types';

const memoAPI = async (req: NextApiRequest, res: NextApiResponse<response>) => {

  const { creator, tags, message, title, id } = req.query;
  try {
    switch (req.method) {
      case 'GET': {
        console.log('getting all from DB');
        const posts = await Memos.find();
        if (!posts) throw new Error(`${req.method}:all falsy no data`);
        console.log(`got from DB :${posts.length} docs`);
        return res.status(200).json({ success: true, data: posts })
      }
      case 'POST': {
        if (creator && tags && message && title) {
          console.log('saving to DB :', { creator, tags, message, title });
          const post: memo[] = await Memos.insertMany([{ creator, tags, message, title }])
          if (!post) throw new Error(`${req.method}:${title} falsy no data`);
          if (!post[0]._id) throw new Error(`${req.method}:${post}:failure`);
          console.log('saved to DB :', post[0]._id);
          return res.status(200).json({ success: true, data: `${req.method}:${title}:success` })
        }
        throw new Error(`${req.method}:missing params for action`);
      }
      case 'DELETE': {
        if (id) {
          console.log('deleting from DB :', id);
          const post = await Memos.findByIdAndDelete(id)
          if (!post) throw new Error(`${req.method}:${id} falsy no data`);
          if (!post._id) throw new Error(`${req.method}:${post}:failure`);;
          console.log('deleted from DB :', post._id);
          return res.status(200).json({ success: true, data: `${req.method}:${id}:success` })
        }
        throw new Error(`${req.method}:missing params for action`);
      }
      default: {
        throw new Error(`${req.method} not supported`);
      }
    }
  } catch (err: any) {
    return res.status(400).json({ success: false, data: req.query, error: err.message })
  }
}

export default memoAPI;