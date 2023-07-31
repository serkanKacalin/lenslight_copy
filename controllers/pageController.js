const getIndexPage = (req, res) => {
    res.render('index', {
        link: "index",
    });
};

const getAboutPage = (req, res) => {
    res.render('about', {
        link: "about",
    });
};

const getRegisterPage = (req, res) => {
    res.render('register', {
        link: "register",
    });
};

const getLoginPage = (req, res) => {
    res.render('login', {
        link: "login",
    });
};

const getLogout = (req, res) => {
    res.cookie("jwt", "", { // logout yaptıgımızda cookielere sakladıgımız tokenımızın ömrünü 1 milisaniye yapıyoruz bu sayede gerçekleşiyor.
        maxAge: 1,
    });
    res.redirect("/");
};

// const getUsersPage = (req, res) => {
//     res.render('users', {
//         link: "users",
//     });
// };




export { getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogout, }; // obje şeklinde export ettik