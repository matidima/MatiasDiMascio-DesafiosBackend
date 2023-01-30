import { Router } from "express";
import passport from "passport";
import { PassportAuth } from "../middlewares/passportAuth.js";
import { IncorrectRoute } from "../middlewares/routeError.js";

const router = Router();

router.get("/", PassportAuth.Authenticated, (req, res) => {
    res.redirect("login");
});

router.get("/login", PassportAuth.Authenticated,(req, res) => {
    res.render("login");
});
router.post("/login",
  passport.authenticate("login", { failureRedirect: "/faillogin" }), (req, res) => {
    res.redirect("/");
  }
);

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register",
  passport.authenticate("register", { failureRedirect: "/failregister" }), (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  const { username } = req.user;
    req.logout(req.user, err => {
      if(err) return next(err);
      res.render("logout", { username });
    });
});

router.get("/failregister", (req, res) => {
  res.render("fail-register");
});

router.get("/faillogin", (req, res) => {
	res.render("fail-login");
});

export { router as AuthRouter};