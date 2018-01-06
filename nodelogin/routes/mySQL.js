var mysql   = require("mysql");

var pool = mysql.createPool({
    connectionLimit : 1000,
    host     : 'localhost',
    user     : 'root',
    password : '6976',
    database : 'mysql',
    port	 : 3306
});


var DB = (function () {

    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                connection.release();
                callback(null, err);
                throw err;
            }

            connection.query(query, params, function (err, rows) {
                connection.release();

                if (!err) {
                    callback(rows,null);
                }
                else {
                    callback(null, err);
                }

            });

            connection.on('error', function (err) {
                connection.release();
                callback(null, err);
                throw err;
            });
        });
    };

    return {
        query: _query
    };
})();

// export default DB;
module.exports = DB;