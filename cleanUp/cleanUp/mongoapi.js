var axios = require('axios');
var data = JSON.stringify({
    "collection": "humans-collections",
    "database": "human-database",
    "dataSource": "ClusterThaHuman",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://us-east-2.aws.data.mongodb-api.com/app/data-pyokt/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'QNM7n7508e9npvF4vjOjy6gRpnC0elHmLdJIvHwCqgZG77iJXsRMhL4Wq5BGJdTf',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
