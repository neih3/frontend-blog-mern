/* eslint-disable @typescript-eslint/no-explicit-any */
import Action from "./Action";

interface Props {
  isSelected: string;
  data: unknown[];
}

const Table = ({ data, isSelected }: Props) => {
  const keys = data && data[0] ? Object.keys(data[0]) : [];
  return (
    <div className="relative border border-gray-700 rounded-lg">
      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg">
        <div className="min-w-[800px]">
          {" "}
          {/* Điều chỉnh min-width tùy theo nội dung */}
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-gray-900 shadow">
            <ul className="flex items-center border-b-2 py-3 border-gray-700">
              {keys.map((key: string) => (
                <li
                  key={key}
                  className="flex-1 px-4 min-w-[120px] font-medium text-gray-200"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </li>
              ))}
            </ul>
          </div>
          {/* Scrollable Content */}
          <div className="divide-y divide-gray-700">
            {data?.map((item: any, index: number) => (
              <ul
                key={item.id || index}
                className="flex items-center py-3 hover:bg-gray-800 transition-colors"
              >
                {keys.map((key: string) => (
                  <li
                    key={key}
                    className="flex-1 px-4 min-w-[120px] truncate"
                    title={item[key]} // Hiển thị tooltip khi hover
                  >
                    {typeof item[key] === "object"
                      ? JSON.stringify(item[key])
                      : item[key]}
                  </li>
                ))}
                <Action id={item._id} isSelected={isSelected} />
              </ul>
            ))}
          </div>
        </div>
      </div>

      {/* Optional: Scroll Indicator */}
      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-gray-900 pointer-events-none" />
    </div>
  );
};

export default Table;
