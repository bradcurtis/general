(function() {

    angular.module('starter.services').factory('BirthdayService', ['$q', 'Loki', '$rootScope', BirthdayService]);
        
    function BirthdayService($q, Loki, $rootScope) {
        var _db;
        var _birthdays;
        var idbAdapter = new LokiIndexedAdapter('loki');

        function initDB() {            
            var fsAdapter = new LokiCordovaFSAdapter({"prefix": "loki"});  
            _db = new Loki('birthdaysDB',
                    {
                        autosave: true,
                       //autoload:true,
                        autosaveInterval: 1000, // 1 second
                       //autoloadCallback: loadHandler,
                       adapter: idbAdapter//fsAdapter adaptor for production deployment
                    });
            
            var options = {
                birthdays: {
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
                _birthdays = _db.getCollection('birthdays');
                if (_birthdays) {
                    _db.removeCollection('birthdays')
                }

               
                    _birthdays = _db.addCollection('birthdays');
                

                
            });

   

        };

        function getAllBirthdays() {        
            return $q(function (resolve, reject) {
    
    
                    resolve(_birthdays.data);
                });
            };
        

        function addBirthday(birthday) {
            _birthdays.insert(birthday);
             $rootScope.$broadcast('hanlebroadcast');
        };

        function updateBirthday(birthday) {            
            _birthdays.update(birthday);
        };

        function deleteBirthday(birthday) {
            _birthdays.remove(birthday);
        };

      

        return {
            initDB: initDB,
            getAllBirthdays: getAllBirthdays,
            addBirthday: addBirthday,
            updateBirthday: updateBirthday,
            deleteBirthday: deleteBirthday,
           
        };
    }
})();
