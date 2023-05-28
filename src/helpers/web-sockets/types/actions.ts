import {TApplicationActions} from "../../../types";

export type TWsActions = {
  wsStart: string;
  wsStop: string;
  onOpen: () => TApplicationActions;
  onMessage: (message: string) => TApplicationActions;
  onError: (error: Event) => TApplicationActions;
  onClose: () => TApplicationActions;
}