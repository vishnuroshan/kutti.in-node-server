const app = require('./app');
const http = require('http');
const config = require('./config/app-config');
const chalk = require('chalk');
const port = config.ARGV2 || config.PORT;
const server = http.createServer();

server.listen(port, () => {
	console.log(
		chalk.bgBlue.black(
			`Server running on:> ${server.address().address ? server.address().address : 'localhost:'
			}${server.address().port}`
		)
	);
});

server.on('request', app);

//? banner
// const figlet = require('figlet');
// figlet.text('URL-shortener', {
// // 	more fonts visit http://www.figlet.org/fontdb.cgi
// 	font: 'isometric3',
// 	width: 80,
// 	whitespaceBreak: true
// }, function (err, data) {
// 	if (err) {
// 		console.log('Something went wrong...');
// 		console.dir(err);
// 		return;
// 	}
// 	console.log(data);
// });
//? banner
