import { getEnvVar } from './getEnvVar'

const swaggerBaseDir = getEnvVar('SWAGGER_BASE_DIR', '_')
let baseDir = swaggerBaseDir
if (swaggerBaseDir.endsWith('/')) {
    baseDir + 'src/router'
} else {
    baseDir + '/src/router'
}

export const swaggerConfig = {
    info: {
        version: '1.0.0',
        title: 'Albums store',
        license: {
            name: 'MIT',
        },
    },
    security: {
        BearerAuth: {
            in: 'header',
            type: 'apiKey',
            scheme: 'bearer',
            name: "Authorization",
            bearerFormat: "JWT",
            description: 'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".'
        },
    },
    baseDir: baseDir,
    filesPattern: './**/*.ts',
    swaggerUIPath: '/api-docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    exposeApiDocs: false,
    apiDocsPath: '/v3/api-docs',
    notRequiredAsNullable: false,
    swaggerUiOptions: {},
};