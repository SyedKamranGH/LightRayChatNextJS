import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const confirmationURL = `${process.env.PINTS_AI_API}/public/otp-confirmation`
        const response = await axios.post(confirmationURL, req.body)

        return res.status(200).json(response.data)
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}
