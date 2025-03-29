
const getBusinessTest = async (req, res) =>{
    res.send("business route works");
}

const addBusiness = async (req, res) => {
    res.send("Business registered successfully");
};

const getAllBusinesses = async (req, res) => {
    res.send("Fetched all businesses");
};

const getBusinessById = async (req, res) => {
    res.send(`Business details for ID ${req.params.id}`);
};

module.exports = { addBusiness, getAllBusinesses, getBusinessById, getBusinessTest };
//use verify token middleware 