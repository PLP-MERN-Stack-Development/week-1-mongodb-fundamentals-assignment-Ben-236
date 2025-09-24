db.books.find({ genre: "Fiction" });

db.books.find({ published_year: {$gt: 1950}});

db.books.find({ author: "George Orwell" });

db.books.updateOne(
  { title: "Animal Farm" },        
  { $set: { price: 15.99 } } 
);

db.books.deleteOne({ title: "The Alchemist" });

db.books.find({
  in_stock: true,
  published_year: { $gte: 1900 }
});

db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
);

db.books.find().sort({ price: 1 });

db.books.find().sort({ price: -1 });

db.books.find().limit(5);

db.books.find().skip(5).limit(5);

db.books.find().skip(10).limit(5);

db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" }, count: { $sum: 1 } } }
]);

db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);

db.books.aggregate([
  {
    $group: {
      _id: {
        decade: {
          $multiply: [
            { $floor: { $divide: ["$published_year", 10] } },
            10
          ]
        }
      },
      count: { $sum: 1 },
      titles: { $push: "$title" }
    }
  },
  { $sort: { "_id.decade": 1 } }
]);


db.books.createIndex({ title: 1 });

db.books.find({ title: "1984" }).explain("executionStats");

db.books.find({ title: "1984" }).explain("executionStats");