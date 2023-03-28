export interface ISummaryItem {
  id: number;
  title: string;
  description: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
}
