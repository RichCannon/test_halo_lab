import { PayloadAction } from "@reduxjs/toolkit"

type InitStateT = {
   [key: string]: {
      data: any
      fetching: boolean
      error: any
   }
}

function createDefaultReducer<
   State extends InitStateT,
   ActionResponse
>(stateName: string) {
   return {
      request(state: State) {
         state[stateName].fetching = true
         state[stateName].error = null
      },
      success(state: State, action: PayloadAction<ActionResponse>) {
         state[stateName].data = action.payload
         state[stateName].fetching = false
      },
      failure(state: State, action: PayloadAction<any>) {
         state[stateName].error = action.payload
         state[stateName].fetching = false
      }
   } as const
}

export { createDefaultReducer }
