export type Challenge = {
  id: number;
  word: string;
  tip: string;
};

export const WORDS: Challenge[] = [
  { id: 1, word: "CSS", tip: "Styles language." },
  { id: 2, word: "REACT", tip: "A lib used to create web interfaces." },
  { id: 3, word: "HTML", tip: "Markup language." },
  {
    id: 4,
    word: "Javascript",
    tip: "One of the most used programming languages in the world.",
  },
  { id: 5, word: "Typescript", tip: "It has something to do with type." },
];
