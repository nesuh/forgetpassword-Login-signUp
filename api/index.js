const express = require('express');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');

const users = [
    {
        id: "1",
        username: "jone",
        password: "jone8080",
        isAdmin: true
    },
    {
        id: "2",
        username: "jo",
        password: "jo8080",
        isAdmin: false
    }
];

const refreshTokens = [];

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        const accessToken = jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            'mysecretkey',
            { expiresIn: '20s' }
        );
        const refreshToken = jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            'myrefreshkey',
            { expiresIn: '7d' }
        );
        refreshTokens.push(refreshToken);
        res.json({
            username: user.username,
            isAdmin: user.isAdmin,
            accessToken,
            refreshToken,
        });
    } else {
        res.status(400).json("Username/password is incorrect!!!");
    }
});

// Refresh token route
app.post('/api/refresh', (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(token)) return res.status(403).json("Refresh token is not valid!");

    jwt.verify(token, 'myrefreshkey', (err, user) => {
        if (err) return res.status(403).json("Refresh token is not valid!");

        const newAccessToken = jwt.sign(
            { id: user.id, isAdmin: user.isAdmin },
            'mysecretkey',
            { expiresIn: '20s' }
        );

        res.json({
            accessToken: newAccessToken
        });
    });
});

// Middleware to verify token
const verify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "mysecretkey", (err, user) => {
            if (err) {
                return res.status(401).json("Token is invalid");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You are not authenticated!");
    }
};

// Delete user route
app.delete('/api/users/:userId', verify, (req, res) => {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
        res.status(200).json("Deleted successfully!");
    } else {
        res.status(403).json("Error happened!");
    }
});

app.get('/api/users/:id',verify, (req,res)=>{

    if(req.user.id === req.params.id && req.user.isAdmin){

        res.status(200).json("all Customers are like these ")
    }
})






app.post('/api/logout',verify,(req,res)=>{
    const refreshToken=req.body.token;
    refreshTokens=refreshTokens.filter((token)=>token !==refreshToken)
    res.status(200).json("you are logout sussfully!");
})
app.listen(5000, () => {
    console.log("Server is running...");
});
