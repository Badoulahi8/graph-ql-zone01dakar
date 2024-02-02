const url = require('url');
const controller = require('../controllers/controller.js');
const { log } = require('console');

const router = {
    handleRequest: (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/') {
            res.end("Home Page")
            controller.homeHandleRequest(req, res);
        } else if (pathname === '/login') {
             res.end("Login Page")
            // controller.loginHandleRequest(req, res);
        } else if (pathname === '/logout') {
             res.end("Logout Page")
            // controller.logoutHandleRequest(req, res);
        } else if (pathname === '/getToken') {
             res.end("getToken Page")
            // controller.getTokenHandleRequest(req, res);
        }else if (pathname === '/getUserDatas') {
             res.end("GetDAtas Page")
            // controller.getUserDatas(req, res);
        }
        // } else {
        //     const error = {
        //         status: 404,
        //         text: 'Page non trouvée',
        //     };
        //     controller.errorHandleRequest(req, res, error);
        // }
    }
};

module.exports = router;
