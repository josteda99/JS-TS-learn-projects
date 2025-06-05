interface IQuestion {
  id: number;
  question: string;
  options: IOption[];
  answer: number;
}

interface IOption {
  id: number;
  option: string;
}
