﻿/// <reference path="jquery/jquery-2.2.3.min.js" />
/// <reference path="jsencrypt.min.js" />

(function () {

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function onDeviceReady() {
    document.addEventListener('pause', onPause.bind(this), false);
    document.addEventListener('resume', onResume.bind(this), false);

    $(function () {

        $('#loginButton').click(function () {
            if (u == '' || p == '') {
                //invalid input, ala'a and Khalid please add validation :) and also stopp this event
            } else {
                var encrypt = new JSEncrypt();
                encrypt.setPublicKey("-----BEGIN PUBLIC KEY-----\
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAILMveJq+2yD2rTo8Fu9ZqtRyylzLyIU\
                UkrUwmPGXLhlXV9mBi6JljvQ2JWrh2j+KtHUvzPGyW4BEyB+Bk9lWdkCAwEAAQ==\
                -----END PUBLIC KEY-----");
                var u = encrypt.encrypt($('#id').val());
                var p = encrypt.encrypt($('#pass').val());


                $.ajax({
                    type: "POST",
                    dataType: "JSON",
                    data: { UserID: u, UserPass: p },
                    url: "http://localhost:38133/index.php?req=login",
                    success: function (data, s, x) {
                        if (data[0] == 1) {
                            window.localStorage.setItem('loggedIn', true);
                            window.localStorage.setItem('sid', data['sid']);
                            window.location = "menu.html";
                        } else if (data[0] == 0) {
                            //todo: Ala'a and Khalid, use a hidden element called error
                            $('#error').show();
                        } else {
                            //this means the document returned -1, should never ever happen
                            alert('fatal error, data was not validated.');
                        }
                    },
                    fail: function () {
                        alert('error');
                    }
                });
            }
            });
    });

};
function onPause() {
    // 
};

function onResume() {
    // 
};
})();