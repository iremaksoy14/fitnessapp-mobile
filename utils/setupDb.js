// import {db} from './db'

// export const setupDatabase = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS exercises (
//         id INTEGER PRIMARY KEY NOT NULL,
//         title TEXT,
//         category TEXT,
//         video TEXT,
//         image TEXT
//       );`
//     );

//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS steps (
//         id INTEGER PRIMARY KEY NOT NULL,
//         exerciseId INTEGER,
//         name TEXT,
//         gif TEXT,
//         FOREIGN KEY(exerciseId) REFERENCES exercises(id)
//       );`
//     );
//   });
// };
