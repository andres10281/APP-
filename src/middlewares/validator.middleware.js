
export const validateSchema = (Schema) => (req, res, next) =>{
        try{
             Schema.parse(req.body);
            next();
    
        }catch (error) {
            return res.status(400).json({massage: error.errors.map((error) => error.massage)});
        }
    };
