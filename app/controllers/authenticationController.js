// const jwt = require('jsonwebtoken')

function verifySecretToken(req, res, next) {
    let secretKey = req.headers['secretkey'];
    let secretCode = req.headers['secretcode'];

    if (typeof secretCode !== 'undefined' && typeof secretKey !== 'undefined') {
        if (secretKey.split(' ')[0] !== 'Bearer') {
            return res.status(500).json({
                message: "Incorrect token secretkey format"
            });
        } else {
            secretKey = secretKey.split(' ')[1];

            if (!secretKey) {
                return res.status(403).json({
                    message: "No token provided"
                });
            } else {

                if(secretKey != "qzwejnzscjnsdjclzcln!i239ncdcs1zjz23!jnsdjcn"){
                    return res.status(401).json({
                        message: "Secret Key Wrong!"
                    }); 
                }

                if(secretCode != "Belajar123!") {
                    return res.status(401).json({
                        message: "Secret Code Wrong!"
                    }); 
                }

                next();
            }
        }
    } else {
        return res.status(400).json({ 
            message: "Bad Request ( secretkey and secretcode required! )"
        });
    }
}

function verifyJWT(req, res, next) {
    // User Authorization with JWT
    // let authToken = req.headers['token'];

    // next();
}

function generateJWT(req, res) {
    // generate JWT by username and password
}


module.exports = { verifySecretToken, verifyJWT, generateJWT }