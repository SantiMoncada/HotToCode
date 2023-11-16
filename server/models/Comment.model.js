const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
    {
        owner:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            minlength: 2,
            maxlength: 250
        }
    },
    {
        timestamps: true,
    }
)

const Comment = model("Comment", commentSchema)

module.exports = Comment