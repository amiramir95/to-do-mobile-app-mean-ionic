const List = require('../models/list');

exports.getOneList = (req, res, next) => {
  List.findById(req.params.id)
    .then(list => {
      res.status(200).json({
        list: list
      });
    })
    .catch(error => {
      res.status(404).json({
        message: 'List not found!'
      });
    });
};

exports.getListByUserId = (req, res, next) => {
  List.find({
    userId: req.params.userId
  })
    .then(documents => {
      res.status(200).json({
        lists: documents
      });
    })
    .catch(error => {
      res.status(404).json({
        message: 'User lists not found!'
      });
    });
};

exports.createList = (req, res, next) => {
  const list = new List({
    name: req.body.name,
    userId: req.body.userId
  });
  list
    .save()
    .then(createdList => {
      res.status(201).json({
        message: 'List added successfully',
        listId: createdList._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a list failed!'
      });
    });
};

exports.updateList = (req, res, next) => {
  const list = new List({
    _id: req.params.id,
    name: req.body.name,
    userId: req.body.userId
  });
  List.updateOne({ _id: req.params.id }, list)
    .then(updatedList => {
      res.status(201).json({
        message: 'List updated successfully!',
        listId: updatedList._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate list!"
      });
    });
};

exports.deleteList = (req, res, next) => {
  List.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: 'List deleted!'
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting a list failed!'
      });
    });
};
