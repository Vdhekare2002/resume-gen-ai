const { request } = require("../App");

const mongoose= require('mongoose')
const blacklistTockenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in blacklist"]
    },
},{
    timestamps:true
}
)
const tokenBlacklistModel= mongoose.model("blacklistTokens",blacklistTockenSchema)
module.exports = tokenBlacklistModel