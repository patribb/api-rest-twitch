//~ register user
export const register = async (req, res) => {
  res.json(req.body);
};

//~ login user
export const login = async (req, res) => {
  res.json({ ok: true });
};
