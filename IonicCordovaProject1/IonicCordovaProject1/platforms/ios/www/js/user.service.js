(function () {

    angular.module('starter.services').factory('UserService', ['$q', 'Loki', UserService]);

    function UserService($q, Loki) {
        var _db;
        var _users;
        var idbAdapter = new LokiIndexedAdapter('loki');

        function initDB() {
            var fsAdapter = new LokiCordovaFSAdapter({ "prefix": "loki" });
            _db = new Loki('usersDB',
                    {
                        autosave: true,
                        autosaveInterval: 1000, // 1 second
                        adapter: idbAdapter
                    });
        };

        function getAllUsers() {
            return $q(function (resolve, reject) {

                var options = {
                    users: {
                        proto: Object,
                        inflate: function (src, dst) {
                            var prop;
                            for (prop in src) {
                                if (prop === 'Date') {
                                    dst.Date = new Date(src.Date);
                                } else {
                                    dst[prop] = src[prop];
                                }
                            }
                        }
                    }
                };

                _db.loadDatabase(options, function () {
                    _users = _db.getCollection('users');

                    if (!_users) {
                        _users = _db.addCollection('users');
                    }

                    resolve(_users.data);
                });
            });
        };

        function addUser(user) {
            if (!_users) {
                _users = _db.addCollection('users');
            }
            _users.insert(user);
        };

        function updateUser(user) {
            _users.update(user);
        };

        function deleteUser(user) {
            _users.remove(user);
        };

        return {
            initDB: initDB,
            getAllUsers: getAllUsers,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };
    }
})();