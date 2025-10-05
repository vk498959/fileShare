import { FtpSrv } from 'ftp-srv';
const port = 2221;

export default function startFTPServer(ip,user,pass,pathh) {
    const ftpServer = new FtpSrv({
        url: "ftp://" + ip + ":" + port,
        anonymous: false
    });

    ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
        if (username === user && password === pass) {
            return resolve({ root: pathh });
        }
        return reject(new errors.GeneralError('Invalid username or password', 401));
    });

    ftpServer.listen().then(() => {
        console.log(`
            You can access the file via ftp://${ip}:${port} 
            username = ${user}
            password= ${pass}        
            `)
    });
}

