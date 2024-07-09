const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const mysql_config = require('./includes/mysql_configs');
const functions = require('./includes/functions');

const API_AVAILABILITY = true;
const API_VERSION = '1.0.0';

const server = express();
server.listen(3000, () => { console.log('API is running ...'); });

server.use((req, res, next) => {
    if (API_AVAILABILITY) {
        next();
    } else {
        res.json(functions.response('Warning', 'API is in maintenance. Sorry!', 0));
    }
});

const connection = mysql.createConnection(mysql_config);

server.use(cors());
server.use(express.json()); // for parsing application/json
server.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded;

// -------------------------------------------------------------------------------
// Routes
server.get('/', (req, res) => {
    res.json(functions.response('Success', 'API is running', 0));
});

// -------------------------------------------------------------------------------
// Endpoints 
// -------------------------------------------------------------------------------

// Get all tasks
server.get('/tasks', (req, res) => {
    connection.query("select * from tasks", (err, rows) => {
        if (!err) {
            res.json(functions.response('Success', 'Success', rows.length, rows));
        } else {
            res.json(functions.response('Error', err.message, 0));
        }
    });
});

// get task by id
server.get('/tasks/:id', (req, res) => {
    const id = req.params.id;
    connection.query("select * from tasks where id = ? ", [id], (err, rows) => {
        if (!err) {
            if (rows.length > 0) {
                res.json(functions.response('Success', 'Success', rows.length, rows));
            } else {
                res.json(functions.response('Error', 'Task not found', 0, null));
            }

        } else {
            res.json(functions.response('Error', err.message, 0));
        }
    });
});

// update task status
server.put('/tasks/:id/status/:status', (req, res) => {
    const id = req.params.id;
    const status = req.params.status;

    connection.query('update tasks set status = ? where id = ?', [status, id], (err, rows) => {
        if (!err) {
            if (rows.affectedRows > 0) {
                res.json(functions.response('Success', 'Task updated with success', rows.affectedRows));
            } else {
                res.json(functions.response('Warning', 'Task not found', 0));
            }
        } else {
            res.json(functions.response('Error', err.message, 0));
        }
    });
});


// delete task
server.delete('/tasks/delete/:id', (req, res) => {
    const id = req.params.id;

    connection.query('delete from tasks where id = ?', [id], (err, rows) => {
        if (!err) {
            if (rows.affectedRows > 0) {
                res.json(functions.response('Success', 'Task deleted with success', rows.affectedRows));
            } else {
                res.json(functions.response('Warning', 'Task not found', 0));
            }
        } else {
            res.json(functions.response('Error', err.message, 0));
        }
    });
});

// create task
server.post('/tasks/create', (req, res) => {
    const post_data = req.body;
    if (post_data == undefined) {
        res.json(functions.response('Warning', 'Empty data', 0));
    }

    if (post_data.task == undefined || post_data.status == undefined) {
        res.json(functions.response('Warning', 'Invalid data', 0));
    }

    const task = post_data.task;
    const status = post_data.status;

    connection.query('insert into tasks (task, status, created_at, updated_at) values ( ?, ?, NOW(), NOW())', [task, status], (err, rows) => {
        if (!err) {
            res.json(functions.response('Success', 'Task created', rows.affectedRows, null));
        } else {
            res.json(functions.response('Error', err.message, 0));
        }
    });
});

server.put('/tasks/update/:id', (req, res) => {
    const id = req.params.id;

    const put_data = req.body;
    if (put_data == undefined) {
        res.json(functions.response('Warning', 'Empty data', 0));
    }

    if (put_data.task == undefined || put_data.status == undefined) {
        res.json(functions.response('Warning', 'Invalid data', 0));
    }

    const task = put_data.task;
    const status = put_data.status;

    connection.query(`update tasks set task = ?,
                                            status = ?,
                                            updated_at = NOW()
                            where id = ?`, [task, status, id], (err, rows) => {
        if (!err) {
            if (rows.affectedRows > 0) {
                res.json(functions.response('Success', 'Task updated', rows.affectedRows));
            } else {
                res.json(functions.response('Warning', 'Task not found', 0));
            }
        } else {
            res.json(functions.response('Error', err.message, 0));
        }
    });
});

// -------------------------------------------------------------------------------
server.use((req, res) => {
    res.json(functions.response('Warning', 'Route not found', 0));
});
