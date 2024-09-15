import { ChangeEvent } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import Button from "../Button/Button";

interface EditComponentProps {
  title: string;
  image: string;
  content: string;
  genres: string;
  setTitle: (value: string) => void;
  setImage: (value: string) => void;
  setContent: (value: string) => void;
  setGenres: (value: string) => void;
  handleSubmit: () => void;
}

const EditComponent = ({
  title,
  image,
  content,
  genres,
  setTitle,
  setImage,
  setContent,
  setGenres,
  handleSubmit,
}: EditComponentProps) => {
  return (
    <div className="p-6">
      <input
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.currentTarget.value)
        }
        type="text"
        className="w-full py-3 px-2 mb-5 outline-none"
        placeholder="Nhập tiêu đề"
        style={{
          background: "rgb(21, 21, 21)",
          color: "white",
          caretColor: "white",
        }}
      />
      <input
        value={image}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setImage(e.currentTarget.value)
        }
        type="text"
        className="w-full py-3 px-2 mb-5 outline-none"
        placeholder="Nhập link ảnh"
        style={{
          background: "rgb(21, 21, 21)",
          color: "white",
          caretColor: "white",
        }}
      />

      <div className="w-full w-1/3 mb-7">
        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
          Thể loại
        </label>
        <div className="relative mt-4">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={genres}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setGenres(event.currentTarget.value)
            }
          >
            <option value="Javascript">Javascript</option>
            <option value="Nodejs">Nodejs</option>
            <option value="ReactJS">ReactJS</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div data-color-mode="dark">
        <MarkdownEditor
          value={content}
          height="200px"
          onChange={(value) => setContent(value)}
        />
      </div>

      <div className="flex justify-end mt-5">
        <Button
          onClick={handleSubmit}
          style={{ background: "rgb(218, 65, 13)" }}
        >
          <span className="font-jet">Xuất bản</span>
        </Button>
      </div>
    </div>
  );
};

export default EditComponent;
