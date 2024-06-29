
const validate = (Schema) => async (req, res, next) => {
    try{
        const pareseBody = await Schema.parseAsync(req.body);
        req.body = pareseBody;
        next();
    }
    catch(err)
    {
        const status = 422;
        const message = "Fill the inputs properly.";
        const extraDetails = err.errors[0].message;
        const error = {status, message, extraDetails}
        next(error);
    }
}

module.exports = validate;