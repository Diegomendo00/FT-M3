var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer((req, res) => {
	fs.readFile(`${__dirname}/images/${req.url}.jpg`, (err, data) => {
		if(err){
			res.writeHead(404, {"content-type": "text/plain"});
			res.end("hubo un error en la imagen")
		}else {
			res.writeHead(200, {"content-type": "image/jpg"})
			res.end(data)
		}
	})
}).listen(3000, "127.0.0.1")
