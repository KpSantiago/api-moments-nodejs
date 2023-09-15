var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/config/database.js
var require_database = __commonJS({
  "src/config/database.js"(exports2, module2) {
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

// src/models/Comments.js
var require_Comments = __commonJS({
  "src/models/Comments.js"(exports2, module2) {
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

// src/models/Moments.js
var require_Moments = __commonJS({
  "src/models/Moments.js"(exports2, module2) {
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

// src/database/index.js
var Sequelize = require("sequelize");
var databaseConfig = require_database();
var Comments = require_Comments();
var Moments = require_Moments();
var connection = new Sequelize(databaseConfig);
Comments.init(connection);
Moments.init(connection);
Comments.associete(connection.models);
Moments.associete(connection.models);
module.exports = connection;
