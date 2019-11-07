let bodyParser = require("body-parser")
let loginlist = [
    {
        user: 1,
        pwd: 1
    }, {
        user: 2,
        pwd: 2
    }
]
module.exports = {
    lintOnSave: false,
    devServer: {
        before(app) {
            app.use(bodyParser.json())
            //点击登录
            app.post("/login", (req, res) => {
                const { user, pwd } = req.body
                let newUser = loginlist.find(item => item.user == user)//判断用户名存在
                if (newUser) {
                    if (newUser.pwd == pwd) {//判断密码是否正确
                        res.send({
                            code: 200,
                            msg: "登录成功"
                        })
                    } else {
                        res.send({
                            code: 202,
                            msg: "密码不正确"
                        })
                    }
                } else {
                    res.send({
                        code: 202,
                        msg: "用户不存在"
                    })
                }
            })
            app.post("/register", (req, res) => {
                const { user} = req.body
                let newUser = loginlist.find(item => item.user == user)//判断用户名存在
                if (newUser) {
                    res.send({
                        code: 202,
                        msg: "用户已存在"
                    })
                } else {
                    loginlist.push(req.body)
                    res.send({
                        code: 200,
                        msg: "注册成功"
                    })
                }
            })
        }
    }

}