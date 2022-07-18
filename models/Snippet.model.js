const { Schema, model } = require("mongoose")

const snippetSchema = new Schema(
    {
        title: String,
        content: String,
        language: {
            type: String,
            enum: ['JS', 'PYTHON', 'C'],
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