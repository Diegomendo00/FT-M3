var http = require("http");
var fs = require("fs");

var beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

http
  .createServer((req, res) => {
    if (req.url === "/api" || req.url === "/api/") {
      res.writeHead(200, { "content-type": "application/json" }); //el applicate/json es cuando quiero mostrar un arreglo
      res.end(JSON.stringify(beatles)); // esto se hace para que en lugar de mostrar un texto me lo muestre en formato json organizado
    }
    //ahora necesitamos que al momento de colocar una url nos traiga a informacion requerida
    // /api/john lennon
    // /api/George Harrison

    if (req.url.substring(0, 5) === "/api/" && req.url.length > 5) {
      // url= /api/John%20Lennon  // %20 se lee como un espacio
      // req.url.substring(0,5) = /api/
      // req.url.length  = 9

      let findBeatle = req.url.split("/").pop(); // primero con el split quita los slash ([api, John%20Lennon], y el pop me extrae el ultimo elemnto de un arreglo por lo cual esto va ser igual a John%20Lennon
      let foundBeatle = beatles.find((b) => findBeatle === encodeURI(b.name)); //el encodeURI lo que hace es convertir el espacio del nombre en %20
      if (foundBeatle) {
        res.writeHead(200, { "content-type": "application/json" }); //el applicate/json es cuando quiero mostrar un arreglo
        res.end(JSON.stringify(foundBeatle)); // y esto para que lo muestre en formato JSON
      } else {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("No existe ese Beatle");
      }
    }
    if (req.url === "/") {
      res.writeHead(200, { "content-type": "text/html" });
      const index = fs.readFileSync(`${__dirname}/index.html`, "utf-8");
      res.end(index);
    }

    let findBeatle = req.url.split("/").pop();
    let foundBeatle = beatles.find((b) => findBeatle === encodeURI(b.name));
    console.log(foundBeatle);
    if (foundBeatle) {
      res.writeHead(200, { "content-type": "text/html" });
      let read = fs.readFileSync(`${__dirname}/beatle.html`, "utf-8");
      read = read.replace(/{name}/g, foundBeatle.name);
      read = read.replace("{birthdate}", foundBeatle.birthdate);
      read = read.replace("{profilePic}", foundBeatle.profilePic);
      res.end(read);
    } else {
      res.writeHead(404, { "content-type": "text/plain" });
      res.end("No existe ese Beatle");
    }
  })
  .listen(3000, "127.0.0.1");
