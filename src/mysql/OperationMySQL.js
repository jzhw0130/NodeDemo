import { connectionMySQLPool } from '../index';

class OperationMySQL {
   initSchema(connection) {
      if (connection) {
         const createUsers = `create table if not exists users(
                                      id int primary key auto_increment,
                                      firstName varchar(100) not null,
                                      lastName varchar(100) not null,
                                      gender int,
                                      age int,
                                      description varchar(200)
                                  )`;
         connection.query(createUsers, (error, results, fields) => {
            if (error) {
               console.log(`Create table error: ${error}`);
            } else {
               console.log(`Create table successfully`);
            }
         });
      }
   }

   response(res, model, error) {
      if (error) {
         res.status(500).send({
            status: 0,
            error
         });
      } else {
         res.status(200).send({
            status: 1,
            result: model
         });
      }
   }

   createUser(req, res) {
      const { firstName, lastName, gender, age, description } = req.body;

      const newUser = { firstName, lastName, gender, age, description };

      connectionMySQLPool.query('INSERT INTO users SET ?', newUser, (error, results, fields) => {
         this.response(res, results, error);
      });
   }

   fetchUser(req, res) {
      const { id } = req.params;

      connectionMySQLPool.query(
         'Select * from users WHERE id = ?',
         id,
         (error, results, fields) => {
            this.response(res, results, error);
         }
      );
   }

   fetchAllUsers(req, res) {
      connectionMySQLPool.query('Select * from users', (error, results, fields) => {
         this.response(res, results, error);
      });
   }
}
export default new OperationMySQL();
