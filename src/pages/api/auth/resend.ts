import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const confirmationURL = `${process.env.PINTS_AI_API}/public/otp-confirmation/email`
        const response = await axios.post(confirmationURL, req.body)

        return res.status(response.status).json(response.data)
    } catch (error) {
        return res.status(500).json({ message: 'Server error' })
    }
}
