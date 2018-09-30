var ipfsAPI = require('ipfs-api');
var fs = require('fs');

const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https'});

const content = fs.readFileSync(__dirname + "/icon-iot.png");
console.log(content);
const buffer = new Buffer(content);
//console.log(buffer.toString('utf8'));
const files = [
    {
    path: "icon-iot.png",
    content: buffer
    }
]
console.log(files);
ipfs.files.add(files).then(function(result) {
    console.log(result);
})