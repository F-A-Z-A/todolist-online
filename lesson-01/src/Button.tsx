type ButtonPropsType = {
  title: string
}

export function Button(props: ButtonPropsType) {
  return <button>{props.title}</button>
}