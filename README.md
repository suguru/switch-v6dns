switch-v6dns
============

Resolve only IPV6 if network interface only has external IPV6 addresses.

## Usage

Detect network interfaces and enable automatically.

  require('switch-v6dns').auto();

Enable force resolving IPV6

  require('switch-v6dns').enable();

Disable force resolving

  require('switch-v6dns').disable();

## License

MIT
