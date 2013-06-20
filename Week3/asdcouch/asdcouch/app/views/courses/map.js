function(doc) {
  if (doc._id.substr(0, 4) === "list"){
     emit(doc._id.substr(4), {
     	"title": doc.title,
     	"category": doc.category,
     	"location": doc.location,
     	"date": doc.date,
     	"items": doc.items
     });
   }
};