module.exports =  {
    getUserSchema: function() { 
        return userSchema;
    },

    getLoginSchema: function() { 
      return loginSchema;
    },
    
    getSubChangeSchema: function() { 
      return changeSubscriptionSchema;
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

var loginSchema = {
"$schema": "http://json-schema.org/draft-07/schema#",
  "properties": {
    "userName": {
      "type": "string"
    },
    "password": {
      "type": "string"
    },
  },
  "required": [
    "userName",
    "password"
  ]
};

var changeSubscriptionSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
    "properties": {
      "id": {
        "type": "integer",
      },
      "email": {
        "type": "string"
      },
      "newsletterSub": {
        "type": "boolean"
      },
    },
    "required": [
      "id",
      "email",
      "newsletterSub"
    ]
  };