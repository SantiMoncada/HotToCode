const { Schema, model } = require("mongoose")

const snippetSchema = new Schema(
    {
        title: String,
        content: {
            type: String,
            minlength: 1,
        },
        language: {
            type: String,
            enum: ['JS', 'PYTHON', 'C', 'RUST', 'CSS'],
            default: 'JS'
        },
        owner:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true

        },
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }],
    },
    {
        timestamps: true,
    }
)

const Snippet = model("Snippet", snippetSchema)

module.exports = Snippet