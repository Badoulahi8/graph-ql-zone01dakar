const url = require('url');
const controller = require('../controllers/controller.js');
const { log } = require('console');

const router = {
    handleRequest: (req, res) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/') {
            res.end({success: true})
            // controller.homeHandleRequest(req, res);
        } else if (pathname === '/login') {
             res.end({success: true})
            // controller.loginHandleRequest(req, res);
        } else if (pathname === '/logout') {
             res.end({success: true})
            // controller.logoutHandleRequest(req, res);
        } else if (pathname === '/getToken') {
             res.end({success: true})
            // controller.getTokenHandleRequest(req, res);
        }else if (pathname === '/getUserDatas') {
             res.end({success: true})
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
