
const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blasomething',
    db:'codeial_development',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'aryanagrawalfirozabad@gmail.com',
            pass: 'mnaamnaa22'
        }
    },
    google_client_id: "203046008975-ja3ilpbgf1lvmo6jm7sleb9ft595dhtt.apps.googleusercontent.com",    
    google_client_secret: "7JzLlt58ipUflvhDh1rr0w6X",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
}

const production = {
    name: 'production'
}


module.exports = development;
// module.exports = production;
