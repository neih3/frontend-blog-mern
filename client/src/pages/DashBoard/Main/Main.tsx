/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "./Header";
import Table from "./Table";

interface Props {
  isSelected: string;
  data: any;
}

export const Main = ({ isSelected, data }: Props) => {
  return (
    <div className="w-10/12">
      <Header title={isSelected} />
      <div className="p-5">
        <Table data={data} isSelected={isSelected} />
      </div>
    </div>
  );
};
