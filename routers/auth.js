

const router = require("express").Router();
const bcrpyt = require("bcrypt");
const Company = require("../models/Company")
const Investor = require("../models/Investor");




//register

router.post("/companyregister", async (req, res) => {

    try {

        const salt = await bcrpyt.genSalt(10);
        const hashedPassword = await bcrpyt.hash(req.body.password, salt);
        const newCompany = new Company({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          
            category:req.body.category,
            sales:req.body.sales,
            profit:req.body.profit,
            equity:req.body.equity,
            evolution:req.body.evolution,
        });

        const company = await newCompany.save();
        res.status(200).json(company);

    } catch (err) {
        res.status(500).json(err);
    }



});


//login

router.post("/companylogin", async (req, res) => {
    try {

        const company = await Company.findOne({ username: req.body.username });
        if(!company){ return res.status(400).json("wrong user name");}

        const validated = await bcrpyt.compare(req.body.password, company.password);
        if (!validated ) { return res.status(400).json("wrong password");
        }

        const { password, ...others } = company._doc;
        res.status(200).json(others);


    } catch (err) {
        res.status(500).json(err);
    }
});



router.post("/investorregister", async (req, res) => {

    try {

        const salt = await bcrpyt.genSalt(10);
        const hashedPassword = await bcrpyt.hash(req.body.password, salt);
        const newInvestor = new Investor({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            category:req.body.category,
            amount:req.body.amount,
        });

        const investor = await newInvestor.save();
        res.status(200).json(investor);

    } catch (err) {
        res.status(500).json(err);
    }



});


//login

router.post("/investorlogin", async (req, res) => {
    try {

        const investor = await Investor.findOne({ username: req.body.username });
        if(!investor){ return res.status(400).json("wrong user name");}

        const validated = await bcrpyt.compare(req.body.password, investor.password);
        if (!validated ) { return res.status(400).json("wrong password");
        }

        const { password, ...others } = investor._doc;
        res.status(200).json(others);




    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router