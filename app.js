const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')
const authMiddleware = require('./middlewares/auth-middleware')
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const postsRouter = require('./routers/posts')
const userRouter = require('./routers/user')
const commentRouter = require('./routers/comment')

const connect = require('./schemas')
connect()

app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(express.json())

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Meditator's Node Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Meditator",
                url: "https://velog.io/@yongh8445",
                email: "yonghoon95@gmail.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: ["./schemas/*.js"],
};

const specs = swaggerJsdoc(options);

app.use('/api', express.urlencoded({ extended: false }), postsRouter)
app.use('/api', express.urlencoded({ extended: false }), userRouter)
app.use('/api', express.urlencoded({ extended: false }), commentRouter)
app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})