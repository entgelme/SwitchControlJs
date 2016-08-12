var switchValue = [
    {id:0 , value:"ON"},
    {id:1 , value:"OFF"}  
];

var index = 0;
exports.getVal = function (req, res, next) {
    res.send(switchValue[index]);
    console.log("Send: " + switchValue[index].value);
    index = (index + 1)%2;
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(switchValue[id]);
};