type ButtonPropsType = {
  title: string
  onClickHandler?: () => void
}

export function Button(props: ButtonPropsType) {
  return <button onClick={props.onClickHandler}>{props.title}</button>
}