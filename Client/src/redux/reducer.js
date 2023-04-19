import {ADD_FAV, REMOVE_FAV, FILTER,ORDER} from './types'

const initialState = {
    myFavorites: [],
    allCharacters: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_FAV:
            const newFavorites = [...state.allCharacters, action.payload];
            return {
              ...state,
              myFavorites: newFavorites,
              allCharacters: newFavorites
            };
        case REMOVE_FAV:
            return {
                ...state,
                myFavorites: state.myFavorites.filter(
                    (fav) => fav.id !== parseInt(action.payload)
                  )
            }
        // case FILTER:
        //     const allCharactersFiltered = state.allCharacters.filter(character => character.gender === action.payload)
        //     return {
        //         ...state,
        //         myFavorites: 
        //             action.payload === 'allCharacters'
        //             ? [...state.allCharactersFav]
        //             : allCharactersFiltered
        //     }
        case FILTER:
            const allCharactersFiltered = state.allCharacters.filter(character => character.gender === action.payload);
            const myFavoritesFiltered = state.allCharactersFav.filter(character => character.gender === action.payload);
            return {
              ...state,
              myFavorites: action.payload === 'All' ? [...state.allCharactersFav] : [...myFavoritesFiltered],
            };

            case ORDER:
                const allCharactersFavCopy = [...state.myFavorites]; // Usar spread operator para copiar el array
                return {
                  ...state,
                  myFavorites:
                    action.payload === 'A'
                      ? allCharactersFavCopy.sort((a, b) => a.id - b.id)
                      : allCharactersFavCopy.sort((a, b) => b.id - a.id)
                };
              
        default:
            return {
                ...state
            }
    }
}

export default reducer;

