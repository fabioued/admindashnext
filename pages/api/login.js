import cookie from 'cookie';

export default async (req, res) => {
    res.setHeader(
        'Set-Cookie', cookie.serialize('auth', req.body.cookieData, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 3600 * 24 * 7,
            sameSite: "strict",
            path: '/'

        })
    )
    res.statusCode = 200;
    res.json({ success: true });
}