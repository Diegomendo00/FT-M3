let fs = require("fs")
let request = require("request")
module.exports = {
	echo: function(args, print){
		print(args.join(" "))
	},
	ls : function( args, print){
		fs.readdir(".", function(err, files){// el punto se coloca para que lea solo los archivos que se encuentren en el directorio donde estoy parado
			if(err) throw err;
			print(files.join("\n"))// como files es un arreglo se utiliza el join para que quede como string y la barra inversa con n significa un enter de distancia
			//para hacerlo manualmente seria asi:
			/* let output = "";
			file.forEach(e => {output = output + e + "\n"})
			print(output)*/
		})
	},
	date: function(args, print){
		print(Date())
	},
	pwd: function(args, print){
		// print working directory
		//imprimir el directorio sobre el cual estoy trabajando
		print(process.cwd())
	},
	cat: function(args, print){
		//args va a ser el nombre del archivo
		//se utiliza para leer un archivo y mostrar todo el contenido 
		fs.readFile(args[0], "utf8", function(err, data){// utf8 es el encoding, es decir un formato de codificacion de caracteres 
			if(err) throw err;// aqui siempre debe separarse con punto y coma
			print(data)
		})
	},
	head: function(args, print){//head es para que muestre las primeras lineas del codigo
		fs.readFile(args[0], "utf8", function(err, data){
			if(err) throw err;
			print(data.split("\n").splice(0, args[1]).join("\n"))
		} )
	},
	tail: function (args, print){//tail es para que muestre las ultimas lineas del codigo
		fs.readFile(args[0], "utf8", function(err, data){
			if(err) throw err;
			print(data.split("\n").splice(-args[1]).join("\n"))//el menos se coloca para que lea el documento de abajo hacia arriba
	})
	},
	curl: function(args, print){
		request(args[0], function(err, data){//toca instalar la dependencia request y luego importarla
			if(err) throw err;
			print(data.body)//para que solo nos traiga lo que se enceuntra en el body del html
		}
		)
	}
}