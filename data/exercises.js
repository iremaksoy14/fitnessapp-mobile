const exercises = [
  {
    id: 1,
    title: "Kalça Egzersizi",
    category: "Alt Vücut",
    durationOptions: [5, 8, 10],
    video:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTRlY2Fvbjh3NTdiZHRrMGJiem5kcXB3M251MHMyOHRsMmlzY21kYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NwOzakbqzOrsfMKBC/giphy.gif",
    image: require("../assets/images/exercise-1.png"),

    steps: [
      {
        id: 2,
        name: "Squat",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
      {
        id: 3,
        name: "Front Lunges",
        gif: "https://media1.tenor.com/m/FKDGhd7VwAAAAAAC/estocadas-frontales.gif",
      },
      {
        id: 4,
        name: "Side Lunges",
        gif: "https://media1.tenor.com/m/PF7Q7Qu1wJEAAAAC/lunges.gif",
      },
    ],
  },
  {
    id: 5,
    title: "Üst Vücut Güçlendirici",
    video:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTRlY2Fvbjh3NTdiZHRrMGJiem5kcXB3M251MHMyOHRsMmlzY21kYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NwOzakbqzOrsfMKBC/giphy.gif",
    category: "Üst Vücut",
    durationOptions: [6, 9],
    image: require("../assets/images/exercise-2.png"),
    steps: [
      {
        id: 6,
        name: "Push-up",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
      {
        id: 7,
        name: "Shoulder Press",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
    ],
  },
  {
    id: 8,
    title: "Karın/Core",
    category: "Alt Vücut",
    durationOptions: [5, 8, 10],
    video:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTRlY2Fvbjh3NTdiZHRrMGJiem5kcXB3M251MHMyOHRsMmlzY21kYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NwOzakbqzOrsfMKBC/giphy.gif",
    image: require("../assets/images/exercise-3.png"),
    steps: [
      {
        id: 9,
        name: "Squat",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
      {
        id: 10,
        name: "Front Lunges",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
      {
        id: 11,
        name: "Side Lunges",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
    ],
  },
  {
    id: 12,
    title: "Yoga",
    video: "https://media1.tenor.com/m/oO2Y6-o7La0AAAAd/yoga-yoga-lover.gif",
    category: "Üst Vücut",
    durationOptions: [6, 9],
    image: require("../assets/images/exercise-6.png"),
    steps: [
      {
        id: 13,
        name: "Push-up",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
      {
        id: 14,
        name: "Shoulder Press",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
    ],
  },
  {
    id: 15,
    title: "Tüm vücut",
    category: "Üst Vücut",
    video:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTRlY2Fvbjh3NTdiZHRrMGJiem5kcXB3M251MHMyOHRsMmlzY21kYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NwOzakbqzOrsfMKBC/giphy.gif",
    durationOptions: [6, 9],
    image: require("../assets/images/exercise-4.png"),
    steps: [
      {
        id: 16,
        name: "Push-up",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
      {
        id: 17,
        name: "Shoulder Press",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
    ],
  },
  {
    id: 18,
    title: "Kardiyo",
    category: "Alt Vücut",
    video:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTRlY2Fvbjh3NTdiZHRrMGJiem5kcXB3M251MHMyOHRsMmlzY21kYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3NwOzakbqzOrsfMKBC/giphy.gif",
    durationOptions: [5, 8, 10],
    image: require("../assets/images/exercise-5.png"),
    steps: [
      {
        id: 19,
        name: "Burpee",
        gif: "https://media1.tenor.com/m/u2-VJiigKCkAAAAC/exercise-jump.gif",
      },
      {
        id: 20,
        name: " İp Atlama",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
      {
        id: 21,
        name: "Kutuya Yüksek Sıçrama",
        gif: "https://media1.tenor.com/m/5z4q0v91sNYAAAAC/squats-exercise.gif",
      },
    ],
  },
];

export default exercises;
