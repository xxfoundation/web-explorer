const mysql = require('mysql')
const MySQLEvents = require('@rodrigogs/mysql-events')

const { Sequelize } = require('sequelize')

const connCredentials = {
    host: 'localhost',
    user: 'root',
    password: 'example'
}
// TODO find a way to have a single connection for both listener and operator
const sequelize = new Sequelize('test', connCredentials.user, connCredentials.password, {
    host: connCredentials.host,
    dialect: 'mysql'
})
const connection = mysql.createConnection(connCredentials)

const changesListener = async (callback) => {
    const instance = new MySQLEvents(connection, {
        startAtEnd: true,
        excludedSchemas: {
            mysql: true,
        }
    })
    await instance.start()

    instance.addTrigger({
        name: 'monitoring all statments from "ChainInfo"',
        expression: 'test.*', // listen to TEST database !!!
        statement: MySQLEvents.STATEMENTS.ALL, // you can choose only insert for example MySQLEvents.STATEMENTS.INSERT, but here we are choosing everything
        onEvent: callback
    })

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error)
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error)
}

const operator = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    return sequelize
}

module.exports = { changesListener, operator }
