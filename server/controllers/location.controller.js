const getLocationTest = async (req, res) =>{
    res.send("location route works");
}


//use verify token middleware
module.exports = {getLocationTest};