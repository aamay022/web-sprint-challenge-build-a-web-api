const express = require('express');
const server = express();

// Configure your server here
server.use(express.json())
// Build your actions router in /api/actions/actions-router.js
const actionRouter = require('../api/actions/actions-router')   
server.use('/api/actions', actionRouter)                                            
// Build your projects router in /api/projects/projects-router.js
const projectRouter = require('../api/projects/projects-router')
server.use('/api/projects', projectRouter)
// Do NOT `server.listen()` inside this file!

module.exports = server;
