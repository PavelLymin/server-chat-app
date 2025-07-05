export const verifyId =  (req, res, next) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({error: 'id is not found'});
    }
    req.id = id;
    next();
}