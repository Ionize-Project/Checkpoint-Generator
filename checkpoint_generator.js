const fs = require('fs'),
      { TurtleCoind } = require('turtlecoin-rpc');

const saveEvery = 10;
const daemon = new TurtleCoind({
	host: 'ionize.xyz',
	port: 23231,
	timeout: 30000,
	ssl: false
});

class Checkpoint {
	constructor(height, hash) {
		this.height = height;
		this.hash = hash;
	}
}

var checkpoints = [];

daemon.getBlockCount().then(async (height) => {
	await console.log("Got blockheight " + height + "!");
	for (let i = 1; i < height; i+=saveEvery) {
		await console.log("Getting block info for height " + (i-1));
		const blockHash = await daemon.getBlockHash({
			height: i
		})
		await checkpoints.push(new Checkpoint(i - 1, blockHash));
	}

	console.log('Got', checkpoints.length, 'checkpoints from 0 to', checkpoints[checkpoints.length - 1].height, 'blocks');
	let csv = ''

	for (const checkpoint of checkpoints) {
		csv += `${checkpoint.height},${checkpoint.hash}\n`
	}

	const buffer = Buffer.from(csv, 'ascii');

	fs.open('checkpoints.csv', 'w', (err, fd) => {
		if (err) throw err
		console.log('Opened checkpoints.csv!');
		fs.write(fd, buffer, 0, buffer.byteLength, 0, (err, bytes) => {
			if(err) throw err;
			console.log('Wrote', Math.floor(bytes / 1024), ' kilobytes');
			fs.close(fd, (err) => {
				console.log('Closed checkpoints.csv!');
			});
		});
	})
})
.catch((error) => {
	throw new Error(`An error occurred whilst getting height of the blockchain : ${error}`);
});
