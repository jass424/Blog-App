const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    role:{
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
        required: true,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 14,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    bio:{
        type: String,
        trim: true,
    },
    avatar: {
        type: String,
        default: '',
    },
    notifications: [{
       type: String, // 'approved' or 'rejected'
       blogTitle: String,
        message: String,
       date: { type: Date, default: Date.now }
    }]
},{timestamps: true})


userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next();
    // Hash the password before saving it to the database
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// userSchema.methods.isPasswordCorrect = async function(password){
//     return await bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;