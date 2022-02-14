import type { NextApiRequest, NextApiResponse } from 'next'
import Users from '../../dir/mongoDB/Users';
import { response, user } from '../../dir/types';
import { isValidId } from '../../dir/functions';

const userAPI = async (req: NextApiRequest, res: NextApiResponse<response>) => {
    const { prefix, phoneNumber } = req.query;
    try {
        switch (req.method) {
            case 'GET': { }
            case 'POST': {
                if (prefix && phoneNumber) {
                    console.log('getting user from DB :', { prefix, phoneNumber });
                    const userDB: user[] = await Users.find({ phoneNumber: `${prefix}-${phoneNumber}` })
                    if (!userDB) throw new Error(`GET:${prefix}-${phoneNumber}from DB falsy no data`);
                    if (isValidId(userDB[0]?._id)) throw new Error(`${req.method}:${prefix}-${phoneNumber}:failure::no duplication`);
                    console.log('saving user to DB :', { prefix, phoneNumber });
                    const user: user[] = await Users.insertMany([{ phoneNumber: `${prefix}-${phoneNumber}` }])
                    if (!user) throw new Error(`${req.method}:${prefix}-${phoneNumber} falsy no data`);
                    if (!isValidId(user[0]?._id)) throw new Error(`${req.method}:${user}:failure`);
                    console.log('saved user to DB :', user[0]._id);
                    return res.status(200).json({ success: true, data: user[0]._id })
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

export default userAPI;