import { config } from 'dotenv'
import { message } from './src/utils/message'
import { getEnvVar } from './src/utils/getEnvVar'

(async () => {
    config()
    const port = getEnvVar('PORT', '8080')
    const src = await import('./src')
    src.app.listen(port, () => console.log(message(port)))
})()