exports.auth=(req,res,next)=>{
const{authorization}=req.headers;
const token=authorization.split(' ',[1]);
const key='secret';
try {
    const user = jwt.verify(token, secretKey);
    req.user_id = user.id;
    req.user_role = user.role;

    return next(); 
} catch (error) {
    return next({ error: error.message, status: 401 }); 
}
}
