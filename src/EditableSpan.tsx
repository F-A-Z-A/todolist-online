import { ChangeEvent, useState } from "react";

type EditableSpanType = {
  title: string;
  onClick: (newTitle: string) => void;
};

export const EditableSpan = ({ title, onClick }: EditableSpanType) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState<string>(title);

  const editMode = () => {
    setEdit(!edit);
    onClick(updateTitle);
  };

  const updateTitleHamdler = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(event.currentTarget.value);
  };

  return edit ? (
    <input value={updateTitle} onBlur={editMode} autoFocus onChange={updateTitleHamdler} />
  ) : (
    <span onDoubleClick={editMode}>{title}</span>
  );
};
