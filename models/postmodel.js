const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    url: {
        type: String,
        required: true
    }

});

// PostSchema.methods.apiRepr = function () {
//     return {
//         username: this.username || '',
//         firstName: this.firstName || '',
//         lastName: this.lastName || ''
//     };
// }

const User = mongoose.model('Post', PostSchema);

module.exports = { User };