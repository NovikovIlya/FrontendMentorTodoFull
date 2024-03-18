import { TodoItem } from "../types/types";


export function countItem(array:TodoItem[]) {
  const count = array?.filter((item:TodoItem) => item.completed === false)
  return count.length;
}

