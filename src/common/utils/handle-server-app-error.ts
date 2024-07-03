import { Dispatch } from "redux";
import { appActions } from "app/app.reducer";
import { BaseResponse } from "common/types/common.types";

/**
 * Обрабатывает ошибки, возвращаемые сервером.
 * @template D Тип данных ответа сервера.
 * @param {BaseResponse<D>} data - Объект ответа сервера с информацией об ошибке.
 * @param {Dispatch} dispatch - Функция из Redux для отправки экшенов в store.
 * @param {boolean} [isGlobalError=true] - Флаг, указывающий, следует ли обрабатывать ошибку как глобальную.
 * @returns {void} - функция ничего не возвращает
 */

export const handleServerAppError = <D>(
  data: BaseResponse<D>,
  dispatch: Dispatch,
  isGlobalError: boolean = true,
): void => {
  if (isGlobalError) {
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }));
    } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }));
    }
  }
  // dispatch(appActions.setAppStatus({ status: "failed" }));
};
