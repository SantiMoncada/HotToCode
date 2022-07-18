const { Schema, model } = require("mongoose")

const snippetSchema = new Schema(
    {
        owner:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        content: String
    },
    {
        timestamps: true,
    }
)

const Snippet = model("Snippet", snippetSchema)

module.exports = Snippet