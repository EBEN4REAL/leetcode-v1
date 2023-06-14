type PlaceholderComponent = {
  component: React.ElementType;
  color: string;
};
interface Config {
  type: string;
  placeholderText: string;
  placeholderImg: PlaceholderComponent;
  styles: string[];
}
interface InputProps {
  config: Config;
  handleInputChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}
const LInput: React.FC<InputProps> = ({ config, handleInputChange }) => {
  return (
    <>
      <div
        className={`${config.styles.join(", ")} flex justify-center items-center  dark:bg-dark-fill-3 rounded-md `}
      >
        <div className="w-1/6 flex justify-center">
          <config.placeholderImg.component
            className={`${config.placeholderImg.color} text-input-grey text-md ml-2`}
          />
        </div>
        <div className="w-5/6">
          <input
            type="text"
            placeholder="Filter topics"
            className="bg-transparent outline-none border-0 dark:text-dark-label-2  placeholder:text-input-grey text-input-grey py-1 placeholder:text-sm "
            onInput={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};

export default LInput;
