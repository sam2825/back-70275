import * as url from 'url';

const config = {
    PORT: 5051, 
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/uploads` }
};



export default config;