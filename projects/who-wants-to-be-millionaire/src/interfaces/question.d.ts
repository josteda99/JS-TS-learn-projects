interface IQuestion {
  id: number;
  question: string;
  options: IOption[];
  answer: number;
  difficulty: number; // 0 -> 10
}

interface IOption {
  id: number;
  option: string;
}
