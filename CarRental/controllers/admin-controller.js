const Car = require('mongoose').model('Car');

module.exports = {
    addCarView: (req, res) => {
        res.render('admin/createCarView');
    },
    createCar:(req,res)=> {
        let carData = req.body;
        console.log(carData);

        let objForCreation = {
            mark: carData.mark,
            model: carData.model,
            image: carData.image,
            year: carData.year,
            creationDate: Date.now(),
            pricePerDay:carData.pricePerDay
        };

        Car.create(objForCreation).then((d)=> {
            console.log(d);
            res.redirect('/viewAll')
        })
    }


};