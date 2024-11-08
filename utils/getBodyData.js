// utils/getBodyData.js
module.exports = (req) => {
    return new Promise((resolve, reject) => {
        try {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            resolve(body);
        });
        } catch (error) {
        reject(error);
        }
    });
};
