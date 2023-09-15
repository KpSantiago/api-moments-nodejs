var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// functions/src/models/Comments.js
var require_Comments = __commonJS({
  "functions/src/models/Comments.js"(exports2, module2) {
    var { DataTypes, Model } = require("sequelize");
    var Comments2 = class extends Model {
      static init(sequelize) {
        super.init(
          {
            username: DataTypes.STRING,
            text: DataTypes.TEXT,
            updated_at: DataTypes.DATEONLY
          },
          {
            sequelize
          }
        );
      }
      static associete(models) {
        this.belongsTo(models.Moments, {
          foreignKey: "moment_id",
          as: "moment"
        });
      }
    };
    module2.exports = Comments2;
  }
});

// functions/src/models/Moments.js
var require_Moments = __commonJS({
  "functions/src/models/Moments.js"(exports2, module2) {
    var { DataTypes, Model } = require("sequelize");
    var Moments2 = class extends Model {
      static init(sequelize) {
        super.init(
          {
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            image: DataTypes.STRING,
            created_at: DataTypes.DATEONLY,
            updated_at: DataTypes.DATEONLY
          },
          {
            sequelize
          }
        );
      }
      static associete(models) {
        this.hasMany(models.Comments, {
          foreignKey: "moment_id",
          as: "comments"
        });
      }
    };
    module2.exports = Moments2;
  }
});

// functions/src/uploads/config/index.js
var require_config = __commonJS({
  "functions/src/uploads/config/index.js"(exports2, module2) {
    var multer = require("multer");
    module2.exports = multer({
      storage: multer.diskStorage({
        destination: function(req, file, callback) {
          callback(null, "./functions/src/uploads/upload");
        },
        filename: function(req, file, callback) {
          const image = file.originalname;
          const randomPrefix = require("crypto").randomBytes(16).toString("hex");
          callback(null, `${randomPrefix}_${image}`);
        },
        filelimits: {
          file: 1
        },
        fileFilter: function(req, file, callback) {
          if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" || file.mimetype == "image/png") {
            return true;
          } else {
            return false;
          }
        }
      })
    });
  }
});

// functions/src/routes/index.js
var express = require("express");
var routes = express.Router();
var Comments = require_Comments();
var Moments = require_Moments();
var upload = require_config();
routes.get(
  "/",
  (req, res) => res.json({ hello: "world", message: "API REST iniciada" })
);
routes.get("/api/moments", upload.array("image"), async (req, res) => {
  try {
    const moments = await Moments.findAll({
      include: { association: "comments" }
    });
    return res.status(200).json({
      message: "Requisi\xE7\xE3o feita",
      data: moments
    });
  } catch {
    return res.status(400).json({
      message: "not found",
      data: []
    });
  }
});
routes.get("/api/moments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const moments = await Moments.findOne({
      include: { association: "comments" },
      where: {
        id
      }
    });
    return res.status(200).json({
      message: "Requisi\xE7\xE3o feita",
      data: moments
    });
  } catch {
    return res.status(400).json({
      message: "Momento n\xE3o encontrado",
      data: []
    });
  }
});
routes.post("/api/moments", upload.single("image"), async (req, res) => {
  try {
    const { title, description, updated_at } = req.body;
    const moments = await Moments.create({
      title,
      description,
      image: req.file.filename,
      updated_at
    });
    return res.status(200).json({
      message: "Momento criado com sucesso!",
      data: moments
    });
  } catch {
    return res.status(400).json({
      message: "N\xE3o foi poss\xEDvel criar o momento",
      data: []
    });
  }
});
routes.delete("/api/moments/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const moments = await Moments.destroy({
      where: {
        id
      }
    });
    return res.status(200).json({
      message: "Momento apagado com sucesso",
      data: moments
    });
  } catch {
    return res.status(400).json({
      message: "N\xE3o foi poss\xEDvel apagar o momento",
      data: []
    });
  }
});
routes.put("/api/moments/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const moments = await Moments.update(
      {
        title,
        description,
        image: req.file.filename
      },
      {
        where: {
          id
        }
      }
    );
    return res.status(200).json({
      message: "Momento atualizado com sucesso!",
      data: moments
    });
  } catch {
    return res.status(400).json({
      message: "N\xE3o foi poss\xEDvel atualizar o momento",
      data: []
    });
  }
});
routes.get("/api/:moment_id/comments", async (req, res) => {
  try {
    const { moment_id } = req.params;
    const comments = await Comments.findAll({
      where: { moment_id }
    });
    return res.status(200).json({
      message: "Requisi\xE7\xE3o feita",
      data: comments
    });
  } catch {
    return res.status(400).json({
      message: "not found",
      data: []
    });
  }
});
routes.post("/api/comments", async (req, res) => {
  try {
    const { username, text, moment_id } = req.body;
    const comments = await Comments.create({
      username,
      moment_id,
      text
    });
    return res.status(200).json({
      message: "Coment\xE1rio adicionado com sucesso!",
      data: comments
    });
  } catch {
    return res.status(400).json({
      message: "N\xE3o foi poss\xEDvel adicionar o coment\xE1rio",
      data: []
    });
  }
});
routes.delete("/api/:id/comments/", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comments.destroy({ where: { id } });
    return res.status(200).json({
      message: "Coment\xE1rio deletado com sucesso!",
      data: comments
    });
  } catch {
    return res.status(400).json({
      message: "N\xE3o foi poss\xEDvel deletar o coment\xE1rio",
      data: []
    });
  }
});
module.exports = routes;
