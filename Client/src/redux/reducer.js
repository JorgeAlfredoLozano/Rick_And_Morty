import { ADD_FAV, FILTER, ORDER, REMOVE_FAV } from "./types";

const initialState = {
    myFavorites: [],
    allCharacters: [],
    
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_FAV:
            return {
                ...state,
                myFavorites: action.payload,
                allCharacters: action.payload
            }
        case REMOVE_FAV:
            case REMOVE_FAV:
            return {
                ...state,
                myFavorites: action.payload
            };

              
        case FILTER:
            const filteredChars = state.allCharacters.filter(character => character.gender === action.payload);
            return {
                ...state,
                myFavorites:
                action.payload === 'allCharacters'
                ? [...state.allCharacters]
                : filteredChars
            };

        case ORDER:
            const allCharactersFavCopy = [...state.allCharacters]
            return {
                    ...state,
                    myFavorites:
                        action.payload === 'A'
                        ? allCharactersFavCopy.sort((a, b) => a.id - b.id)
                        : allCharactersFavCopy.sort((a, b) => b.id - a.id)
             }
        default:
            return {...state};
        }
    }

export default reducer;
