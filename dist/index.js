var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// functions/src/models/Comments.js
var require_Comments = __commonJS({
  "functions/src/models/Comments.js"(exports, module2) {
    var { DataTypes, Model } = require("sequelize");
    var Comments = class extends Model {
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
    module2.exports = Comments;
  }
});

// functions/src/models/Moments.js
var require_Moments = __commonJS({
  "functions/src/models/Moments.js"(exports, module2) {
    var { DataTypes, Model } = require("sequelize");
    var Moments = class extends Model {
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
    module2.exports = Moments;
  }
});

// functions/src/uploads/config/index.js
var require_config = __commonJS({
  "functions/src/uploads/config/index.js"(exports, module2) {
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
var require_routes = __commonJS({
  "functions/src/routes/index.js"(exports, module2) {
    var express2 = require("express");
    var routes2 = express2.Router();
    var Comments = require_Comments();
    var Moments = require_Moments();
    var upload = require_config();
    routes2.get(
      "/",
      (req, res) => res.json({ hello: "world", message: "API REST iniciada" })
    );
    routes2.get("/api/moments", upload.array("image"), async (req, res) => {
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
    routes2.get("/api/moments/:id", async (req, res) => {
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
    routes2.post("/api/moments", upload.single("image"), async (req, res) => {
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
    routes2.delete("/api/moments/:id", async (req, res) => {
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
    routes2.put("/api/moments/:id", upload.single("image"), async (req, res) => {
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
    routes2.get("/api/:moment_id/comments", async (req, res) => {
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
    routes2.post("/api/comments", async (req, res) => {
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
    routes2.delete("/api/:id/comments/", async (req, res) => {
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
    module2.exports = routes2;
  }
});

// functions/src/config/database.js
var require_database = __commonJS({
  "functions/src/config/database.js"(exports, module2) {
    module2.exports = {
      database: "verceldb",
      username: "default",
      dialect: "postgres",
      host: "ep-odd-lab-34556090.us-east-1.postgres.vercel-storage.com",
      sslmode: "verify-full",
      password: "vdk3Uj1bluRw",
      url: "postgres://default:vdk3Uj1bluRw@ep-odd-lab-34556090.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=verify-full"
    };
  }
});

// functions/src/database/index.js
var require_database2 = __commonJS({
  "functions/src/database/index.js"(exports, module2) {
    var Sequelize = require("sequelize");
    var databaseConfig = require_database();
    var Comments = require_Comments();
    var Moments = require_Moments();
    var connection = new Sequelize(databaseConfig);
    Comments.init(connection);
    Moments.init(connection);
    Comments.associete(connection.models);
    Moments.associete(connection.models);
    module2.exports = connection;
  }
});

// functions/src/index.js
var express = require("express");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var routes = require_routes();
var path = require("path");
require_database2();
var app = express();
app.listen(process.env.PORT || 3e3);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(routes);
app.use(
  "/api/images/",
  express.static(path.resolve(__dirname, "uploads", "upload"))
);
