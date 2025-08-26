const crypto = require('crypto');

function sha256(data, key) {
	if (key) {
		return crypto.createHmac('sha256', key).update(data, 'utf8').digest('hex');
	}
	return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

function randomId(prefix = '') {
	return prefix + crypto.randomBytes(8).toString('hex');
}

module.exports = { sha256, randomId };
