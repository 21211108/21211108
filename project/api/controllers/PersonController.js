/**
 * PersonController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function (req, res) {

        if (req.method == "GET") return res.view('person/create');
        
        var person = await Person.create(req.body).fetch();
    
        return res.status(201).json({ id: person.id });
    },
    json: async function (req, res) {

        var everyones = await Person.find();
    
        return res.json(everyones);
    },
    list: async function (req, res) {

        var everyones = await Person.find();
        
        return res.view('person/list', { persons: everyones });
    },
    read: async function (req, res) {

        var thatPerson = await Person.findOne(req.params.id);
    
        if (!thatPerson) return res.notFound();
    
        return res.view('person/read', { person: thatPerson });
    },
    delete: async function (req, res) {

        var deletedPerson = await Person.destroyOne(req.params.id);
    
        if (!deletedPerson) return res.notFound();
    
        return res.ok("Person deleted."); 
    },
    update: async function (req, res) {

        if (req.method == "GET") {
    
            var thatPerson = await Person.findOne(req.params.id);
    
            if (!thatPerson) return res.notFound();
    
            return res.view('person/update', { person: thatPerson });
            
        } else {
        
            var updatedPerson = await Person.updateOne(req.params.id).set(req.body);
    
            if (!updatedPerson) return res.notFound();
    
            return res.ok("Record updated");
        }
        
    },
    search: async function (req, res) {
    
        var whereClause = {};
        
        if (req.query.name) whereClause.name = { contains: req.query.name };
        
        var parsedAge = parseInt(req.query.age);
        if (!isNaN(parsedAge)) whereClause.age = parsedAge;
        
        var thosePersons = await Person.find({
            where: whereClause,
            sort: 'name'
        });
        
        return res.view('person/list', { persons: thosePersons });
    },
};

