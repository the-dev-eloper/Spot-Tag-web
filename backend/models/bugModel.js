const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const bugSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    reason: {
        type: String,
    },
    testingTool: {
        type: String,
    },
    solution: {
        type: String,
        required: true,
    },
    refLink: {
        type: String,
    },
    addedBy: {
        type: String,
    },
});

bugSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

bugSchema.set('toJSON', {
    virtuals: true
});

exports.Bug = mongoose.model('Bug', bugSchema);
