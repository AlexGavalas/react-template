const register = (app) => {

    app.post('/login', (req, res) => res.json({ ok: true }));
};

export default {
    register,
};
