import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';


let refreshTokens = []

let getLogin = (req, res) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.isLoggedIn
    });
}


// app.post('/token', (req, res) => {
//   const refreshToken = req.body.token
//   if (refreshToken == null) return res.sendStatus(401)
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403)
//     const accessToken = generateAccessToken({ name: user.name })
//     res.json({ accessToken: accessToken })
//   })
// })

// app.delete('/logout', (req, res) => {
//   refreshTokens = refreshTokens.filter(token => token !== req.body.token)
//   res.sendStatus(204)
// })

let postLogin = (req, res) => {
  // Authenticate User

  const username = req.body.username
  const user = { name: username }
  console.log(user);
  const accessToken = generateAccessToken(user)
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)
  res.cookie('refreshTokens', refreshTokens, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // thời gian sống 
    httpOnly: true, // chỉ có http mới đọc được token
    //secure: true; //ssl nếu có, nếu chạy localhost thì comment nó lại
  })  
  res.status(200).json({ accessToken: accessToken });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}

export default { getLogin, postLogin };