require('dotenv').config()
const express = require("express");
const app = express()
// const env = require("./.env")

const port = 3000

const jwt = require("jsonwebtoken")
app.use(express.json())
const posts = [
    {
      username: 'Kyle',
      title: 'Post 1'
    },
    {
      username: 'Jim',
      title: 'Post 2'
    }
  ]

  app.get('/posts', authenticateToken, (req, res) => {
      
      console.log("user by req is ", req.user.name)

    res.json(posts.filter(post => post.username === req.user.name))
  })

  app.get('/', (req, res)=>{
      res.json(posts)
  })



function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      console.log(user)
      next()
    })
  }

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})