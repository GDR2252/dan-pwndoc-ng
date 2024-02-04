module.exports = function (app) {
  var Comments = require("mongoose").model("Comment");
    var Response = require("../lib/httpResponse.js");

  // Get companies list
  app.post("/api/comments/:editorId", function (req, res) {
    const editorId = req.params.editorId;
    
    var comments = {};
    comments.editorId = editorId;
    comments.comments = req.body;
    Comments.update(editorId, comments)
      .then((msg) => Response.Ok(res, "Company updated successfully"))
      .catch((err) => Response.Internal(res, err));
  });
     app.get("/api/comments/:editorId", function (req, res) {
       const editorId = req.params.editorId;
      
       Comments.get(editorId)
         .then((msg) => Response.Ok(res, msg))
         .catch((err) => Response.Internal(res, err));
     });
};
