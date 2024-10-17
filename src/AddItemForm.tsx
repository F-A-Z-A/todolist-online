import { Button } from "./Button";
import { ChangeEvent, KeyboardEvent, useState } from "react";

type AddItemFormType = {
  addItem: (title: string) => void;
};
export const AddItemForm = ({ addItem }: AddItemFormType) => {
  const [item, setItem] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setItem(event.currentTarget.value);
  };

  const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.key === "Enter") {
      addItemHandler();
    }
  };

  const addItemHandler = () => {
    if (item.trim() !== "") {
      addItem(item.trim());
      setItem("");
    } else {
      setError("Title is required");
    }
  };
  return (
    <div>
      <input
        className={error ? "error" : ""}
        value={item}
        onChange={changeTaskTitleHandler}
        onKeyUp={addItemOnKeyUpHandler}
      />
      <Button title={"+"} onClick={addItemHandler} />
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  );
};
