const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                filteredHeroes: state.activeFilter === 'all' ?
                                action.payload :
                                action.payload.filter((item) => item.element === state.activeFilter), 
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'FILTER_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTER_FETCHED':
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTER_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                activeFilter: action.payload,
                filteredHeroes: action.payload === 'all' ?
                                state.heroes :
                                state.heroes.filter(item => item.element === action.payload)
            }
        case 'HERO_DELETED':
            const newHeroes = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroes,
                filteredHeroes: state.activeFilter === 'all' ?
                                newHeroes :
                                newHeroes.filter(item => item.element === state.activeFilter)
            }
        case 'HERO_CREATED':
            const newHeroesList = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newHeroesList,
                filteredHeroes: state.activeFilter === 'all' ? 
                                newHeroesList : 
                                newHeroesList.filter(item => item.element === state.activeFilter)
            }
        default: return state
    }
}

export default reducer;