const mysql = require('mysql2');
/*
 This modules connects to mysql database.
 Gets details from config
 */
function mySqlConnector() {

    this.connect = function(mySqlConfig, logger) {
        return new Promise((resolve, reject) => {
            try {
                // logger.debug("Creating a connection with database");
                const connection = mysql.createConnection({
                    host: mySqlConfig['url'],
                    port: mySqlConfig['port'],
                    user: mySqlConfig['user'],
                    password: mySqlConfig['pass'],
                    database: mySqlConfig['database'],
                    maxPreparedStatements: 500,
                    multipleStatements: true,
                    connectTimeout : mySqlConfig['connectTimeout']
                });
                resolve(connection);
            } catch (error) {
                reject(reject);
            }
        })

    };
}

module.exports = mySqlConnector;
