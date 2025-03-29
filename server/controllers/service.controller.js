const paymentService = require('../services/payment.service');

const getServiceTest = async (req, res) =>{
    res.send("service route works");
}
const applyConsulting = async (req, res) => {
    res.send("Application for consulting submitted");
};

const processPayment = async (req, res) => { 
    try {
        await paymentService(req).then(res => {
            if(res.ok) return res.json();
        }).then(({ url }) => window.location = url);
    } catch (error) {
        console.error("payment error");
    }
};

const freeTrial = async (req, res) => {
    res.send("Free trial applied");
};

const getFullService = async (req, res) => {
    res.send("Full service document requested");
};

const getApplicationStatus = async (req, res) => {
    res.send(`Application status for ID ${req.params.id}`);
};

const updateApplication = async (req, res) => {
    res.send(`Application ${req.params.id} updated`);
};

const updatePaymentStatus = async (req, res) => {
    res.send(`Payment status for ${req.params.id} updated`);
};

module.exports = { applyConsulting, processPayment, freeTrial, getFullService, getApplicationStatus, updateApplication, updatePaymentStatus, getServiceTest };

//use verify token middleware 