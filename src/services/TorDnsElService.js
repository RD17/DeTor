import dns from 'dns'
import ipaddr from 'ipaddr.js'

const TOR_EXIT_LIST_DNS = 'ip-port.exitlist.torproject.org'

export const isFromTor = (sourceIp, destIp, destPort) => new Promise((resolve, reject) => {
    if (!ipaddr.isValid(sourceIp)) {
        throw new Error(`Source IP (${sourceIp}) is invalid`)
    }
    sourceIp = ipaddr.process(sourceIp)
    if (sourceIp.kind() != 'ipv4') {
        throw new Error(`Source IP (${sourceIp.toString()}) is not an IPv4 address`)
    }

    if (!ipaddr.isValid(destIp)) {
        throw new Error(`Destination IP (${destIp}) is invalid`)
    }
    destIp = ipaddr.process(destIp)
    if (destIp.kind() != 'ipv4') {
        throw new Error(`Destination IP (${destIp.toString()}) is not an IPv4 address`)
    }

    destPort = parseInt(destPort, 10)
    if (destPort === NaN) {
        throw new Error(`Destination Port (${destPort}) is invalid`)
    }
    if ((destPort < 0) || (destPort > 65535)) {
        throw new Error(`Destination Port (${destPort}) is in invalid range [0 - 65535]`)
    }

    const result = {
        sourceIp: sourceIp.toString(),
        destIp: destIp.toString(),
        destPort: destPort.toString()
    }

    sourceIp = sourceIp.toByteArray().reverse().join('.')
    destIp = destIp.toByteArray().reverse().join('.')

    dns.lookup(`${sourceIp}.${destPort}.${destIp}.${TOR_EXIT_LIST_DNS}`, (err, address, family) => {
        if (err) {
            if (err.code && err.code == 'ENOTFOUND') {
                resolve({ ...result, found: false })
                return
            }
            reject(err)
            return
        }

        resolve({ ...result, found: true })
    })
})