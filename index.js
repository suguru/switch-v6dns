/**
 * Use IPV6 resolver 
 * if network interface has only V6 address
 */
var dns = require('dns');
var os = require('os');

var originLookup = dns.lookup;
// overwrite lookup to resolve V6 address
function lookup(domain, family, callback) {
	if (typeof family === 'function') {
		callback = family;
	}
	// force reset to family as 6
	originLookup.call(dns, domain, 6, callback);
}

/**
 * Enable force-IPv6 resolver
 */
function enable() {
	dns.lookup = lookup;
}

/**
 * Disable force-IPv6 resolver
 */
function disable() {
	dns.lookup = originLookup;
}

/**
 * Auto-detect network interfaces.
 * It will enable if interfaces have only v6 addresses (without 127.0.0.1).
 * @returns flag true if enabled force-v6 dns
 */
function auto() {
	var hasOnlyV6 = true;
	var networkInterfaces = os.networkInterfaces();
	function detect(iface) {
		// iface should be { address: 'xx.xx.xx', family: 'IPV6|IPV4', internal: true/false }
		if (iface.internal === false && iface.family === 'IPv4') {
			hasOnlyV6 = false;
		}
	}
	for (var name in networkInterfaces) {
		var ifaces = networkInterfaces[name];
		ifaces.forEach(detect);
	}
	if (hasOnlyV6) {
		enable();
		return true;
	} else {
		disable();
		return false;
	}
}

module.exports = {
	enable: enable,
	disable: disable,
	auto: auto
};
auto();
