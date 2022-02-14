import type { NextApiRequest, NextApiResponse } from 'next'
import Memos from '../../dir/mongoDB/Memos';
import { response, memo } from '../../dir/types';
import { isValidId } from '../../dir/functions';

const memoAPI = async (req: NextApiRequest, res: NextApiResponse<response>) => {

  const { creator, tags, message, title, id } = req.query;
  try {
    switch (req.method) {
      case 'GET': {
        if (creator) {
          console.log(`getting creator: ${creator} memos from DB`);
          const posts: memo[] = await Memos.find({ creator });
          if (!posts) throw new Error(`${req.method}:all falsy no data`);
          console.log(`got from DB :${posts.length} docs of creator ${creator}`);
          return res.status(200).json({ success: true, data: posts })
        }
        throw new Error(`${req.method}:missing creator for action`);
      }
      case 'POST': {
        if (creator && tags && message && title) {
          console.log('saving to DB :', { creator, tags, message, title });
          const post: memo[] = await Memos.insertMany([{ creator, tags, message, title }])
          if (!post) throw new Error(`${req.method}:${title} falsy no data`);
          if (!isValidId(post[0]?._id)) throw new Error(`${req.method}:${post}:failure`);
          console.log(`saved to DB : memo ${post[0]._id} of creator ${creator}`);
          return res.status(200).json({ success: true, data: `${req.method}:${title}:success` })
        }
        throw new Error(`${req.method}:missing params for action`);
      }
      case 'DELETE': {
        if (id && isValidId(id)) {
          console.log('deleting from DB :', id);
          const post: memo | null = await Memos.findByIdAndDelete(id)
          if (!post) throw new Error(`${req.method}:${id} falsy no data`);
          if (!isValidId(post?._id)) throw new Error(`${req.method}:${post}:failure`);;
          console.log(`deleted from DB :memo ${post._id} of creator ${post.creator}`);
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