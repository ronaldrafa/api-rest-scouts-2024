export const login =  (req, res) => {
    res.json({ ok: "Login" });
  };

export const register =  (req, res) => {
    console.log(req.body);
    res.json({ ok: "Register" });
  };