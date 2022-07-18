const { Schema, model } = require("mongoose")

const commentSchema = new Schema(
    {
        title: String,
        owner:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            maxlength: 250
        }
    },
    {
        timestamps: true,
    }
)

const Comment = model("Comment", commentSchema)

module.exports = Comment