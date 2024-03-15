export const message = (port: string) => {
    const spaceTotal = 56
    const host = `http://127.0.0.1:${port}/`
    const spaceFree = spaceTotal - host.length
    const spaceAround = Math.floor(spaceFree / 2)
    const extra = (spaceAround * 2 + host.length) < spaceTotal ? 1 : 0
    let message = `
╔════════════════════════════════════════════════════════╗
║                                                        ║
║      _____ ___  ____   ___       _    ____  ____       ║
║     |_   _/ _ \\|  _ \\ / _ \\     / \\  |  _ \\|  _ \\      ║
║       | || | | | | | | | | |   / _ \\ | |_) | |_) |     ║
║       | || |_| | |_| | |_| |  / ___ \\|  __/|  __/      ║
║       |_| \\___/|____/ \\___/  /_/   \\_\\_|   |_|         ║
║                                                        ║
`
    message += `║${' '.repeat(spaceAround)}${host}${' '.repeat(spaceAround + extra)}║`
    message += '\n╚════════════════════════════════════════════════════════╝'
    return message
}
