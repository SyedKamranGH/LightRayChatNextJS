import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

// Citation PDF endpoint needs authentication.
// If we open a new tab with a link to API server, there is no way to pass the authentication token.
// Currently, authentication token lives inside localStorage.
// We also can't access the localStorage.

// So the strategy is as follows:
// 1. When the user login or signup, we also set the cookie with the same token from Express server.
// 2. When the user clicks on the citation link, it will call this NextJS proxy endpoint.
// 3. In this endpoint, we parse the cookie and attach in authorization header and hit the express server.
// 4. Stream back the response to the client.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // We host the API server and NextJS server on the same domain.
    // This NextJS proxy endpoint will be called from the client and the request will be proxied to upstream API server.
    // But somehow, nginx has some issues and we couldn't get it work to use the domain.
    // So, we need to use internal IP address for the upstream API.
    // Please make sure PINTS_AI_API is set to the internal IP address.
    const upstreamUrl = `${process.env.PINTS_AI_API}/v1/citations/file/${req.query.filename}`
    const authToken = req.cookies.authToken

    if (!authToken) {
        // TODO :: show warning page to make sure if the user is logged in
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const response = await axios.get(upstreamUrl, {
        headers: { Authorization: `Bearer ${authToken}` },
        responseType: 'stream',
    })

    response.data.pipe(res)
}
