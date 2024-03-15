require('esbuild').buildSync({
    entryPoints: ['index.ts'],
    platform: 'node',
    bundle: true,
    target: 'node20',
    outfile: 'dist/index.js',
    logLevel: 'info',
    packages: 'external'
})