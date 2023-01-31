const app = require('express')();
const { auth, initializeApp } = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth')
const admin = require('firebase-admin/app');
const firebase = require('firebase/app');
// const auth = require('firebase/auth');
require('firebase/auth')


admin.initializeApp({
    credential: admin.cert({
        //your firebase credentials
    })
})

const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).send({
        'message': 'api is working'
    })
})
app.get('/:idToken', (req, res) => {
    const { idToken } = req.params;
    // console.log(idToken)
    getAuth()
        .verifyIdToken(idToken)
        .then(decodedToken => {
            console.log(decodedToken);
            res.status(200).send({
                'idToken': idToken,
                'decodedToken': decodedToken
            })
        })
    

})

app.listen(
    PORT, 
    () => {
        console.log("port: 3000");
    }
)
