const manta = require('manta'),
      fs = require('fs');

module.exports = manta.createClient({
    sign: manta.privateKeySigner({
		key: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa', 'utf8'),
		keyId: process.env.MANTA_KEY_ID,
		user: process.env.MANTA_USER
	}),
	user: process.env.MANTA_USER,
	url: process.env.MANTA_URL
});
