const getServiceTest = async (req, res) =>{
    res.send("service route works");
}
//use verify token middleware
module.exports = {getServiceTest};