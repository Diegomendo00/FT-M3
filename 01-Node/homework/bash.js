   const commands = require("./commands/index")
	//siempre que se exporte un modulo este llegara en forma de objeto con propiedades y funciones
	// commands seria igual a: {is: function. pwd: function, date: function} 

const print =function(output){
	process.stdout.write(output),
	process.stdout.write("\nprompt > ")
}

	
	// Output un prompt
    process.stdout.write('prompt > ');
    // El evento stdin 'data' se dispara cuando el user escribe una línea
    process.stdin.on('data', function (data) {
      let args = data.toString().trim().split(" "); //el .trim remueve la nueva línea que surge al oprimir enter
// esta linea convierte lo que escriba por consola en un arreglo. ejm: "hola como estas" quedaria como: ["hola", "como", "estas"]
		let cmd =args.shift()

		if(commands[cmd]){
			commands[cmd](args, print)
			//tambien se puede realizar esto mismo con la funcion hasOwnProperty
		}else{
			print("command not found")
		}
      
    });