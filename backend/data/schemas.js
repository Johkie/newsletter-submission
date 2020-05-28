module.exports =  {
    getUserSchema: function() { 
        return userSchema;
    }
}

  var userSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/User",
    "definitions": {
      "User": {
        "type": "object",
        "additionalProperties": false,
        "properties": {
          "id": {
            "type": "integer",
          },
          "userName": {
            "type": "string"
          },
          "password": {
            "type": "string"
          },
          "email": {
            "type": "string"
          },
          "newsletterSub": {
            "type": "boolean"
          }
        },
        "required": [
          "userName",
          "password",
          "email",
          "newsletterSub"
        ],
        "title": "User"
      }
    }
  };