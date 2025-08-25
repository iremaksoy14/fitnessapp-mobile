// import * as SQLite from "expo-sqlite";
// const db = SQLite.openDatabase("categories.db");

// const exercises = [
//   {
//     id: 1,
//     title: "Kalça Egzersizi",
//     category: "Alt Vücut",
//     durationOptions: [5, 8, 10],
//     video: "https://sporium.net/wp-content/uploads/2022/04/donkey-kick.gif",
//     image: "../assets/images/exercise-1.png",

//     steps: [
//       {
//         id: 2,
//         name: "Squat",
//         gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
//       },
//       {
//         id: 3,
//         name: "Front Lunges",
//         gif: "https://media1.tenor.com/m/FKDGhd7VwAAAAAAC/estocadas-frontales.gif",
//       },
//       {
//         id: 4,
//         name: "Side Lunges",
//         gif: "https://media1.tenor.com/m/PF7Q7Qu1wJEAAAAC/lunges.gif",
//       },
//     ],
//   },
//   {
//     id: 5,
//     title: "Üst Vücut Güçlendirici",
//     video:
//       "https://fitnessprogramer.com/wp-content/uploads/2021/06/Dynamic-Chest-Stretch.gif",
//     category: "Üst Vücut",
//     durationOptions: [6, 9],
//     image: "../assets/images/exercise-2.png",
//     steps: [
//       {
//         id: 6,
//         name: "Push-up",
//         gif: "https://static.wixstatic.com/media/00b9a7_c54089f1c94f495ab637fa3729c51913~mv2.gif",
//       },
//       {
//         id: 7,
//         name: "Shoulder Press",
//         gif: "https://static.wixstatic.com/media/00b9a7_07cd1f6fdafe402a91fff2d1364cca3c~mv2.gif",
//       },
//     ],
//   },
//   {
//     id: 8,
//     title: "Karın/Core",
//     category: "Alt Vücut",
//     durationOptions: [5, 8, 10],
//     video:
//       "https://fitnessprogramer.com/wp-content/uploads/2021/02/Mountain-climber.gif",
//     image: "../assets/images/exercise-3.png",
//     steps: [
//       {
//         id: 9,
//         name: "Squat",
//         gif: "https://static.wixstatic.com/media/00b9a7_2e35f19f6215460ebf70319b7bcbcecb~mv2.gif",
//       },
//       {
//         id: 10,
//         name: "Front Lunges",
//         gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Split-Squat.gif",
//       },
//       {
//         id: 11,
//         name: "Side Lunges",
//         gif: "https://fitnessprogramer.com/wp-content/uploads/2021/05/Side-Lunge-Stretch.gif",
//       },
//     ],
//   },
//   {
//     id: 12,
//     title: "Yoga",
//     video:
//       "https://i.pinimg.com/originals/03/79/a1/0379a132ca92dd0ca6b23b710bc7a592.gif",
//     category: "Üst Vücut",
//     durationOptions: [6, 9],
//     image: "../assets/images/exercise-6.png",
//     steps: [
//       {
//         id: 13,
//         name: "Push-up",
//         gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
//       },
//       {
//         id: 14,
//         name: "Shoulder Press",
//         gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
//       },
//     ],
//   },
//   {
//     id: 15,
//     title: "Tüm vücut",
//     category: "Üst Vücut",
//     video:
//       "https://i.pinimg.com/originals/03/79/a1/0379a132ca92dd0ca6b23b710bc7a592.gif",
//     durationOptions: [6, 9],
//     image: "../assets/images/exercise-4.png",
//     steps: [
//       {
//         id: 16,
//         name: "Push-up",
//         gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
//       },
//       {
//         id: 17,
//         name: "Shoulder Press",
//         gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
//       },
//     ],
//   },
//   {
//     id: 18,
//     title: "Kardiyo",
//     category: "Alt Vücut",
//     video:
//       "https://static.wixstatic.com/media/00b9a7_628058c3e1b147f2b54fbf0f0f31c721~mv2.gif",
//     durationOptions: [5, 8, 10],
//     image: "../assets/images/exercise-5.png",
//     steps: [
//       {
//         id: 19,
//         name: "Burpee",
//         gif: "https://static.wixstatic.com/media/00b9a7_611f06ec44c846a0af54c01ee3b8409a~mv2.gif",
//       },
//       {
//         id: 20,
//         name: " İp Atlama",
//         gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
//       },
//       {
//         id: 21,
//         name: "Kutuya Yüksek Sıçrama",
//         gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
//       },
//     ],
//   },
// ];

// const initDatabase = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS exercises (
//         id INTEGER PRIMARY KEY NOT NULL,
//         title TEXT,
//         category TEXT,
//         video TEXT,
//         durationOptions TEXT,
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

// export { db, initDatabase };
