var Valor = {};
    Valor.Utils = {};
    Valor.Utils.Validator = {};

Valor.Utils.Validator.Email = function () {

    var emailRegExp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ),
        validate = function (email) {

            var isValid = false;

            if(arguments.length === 0) {
                throw "No email provided";
            }

            if(typeof email != 'string') {
                throw "The email should be string";
            }
             
            isValid = emailRegExp.test(email);

            return {
                isValid: isValid,
                username: "andrew"
            };
        }  

        return {
            validate: validate,
        }
}
