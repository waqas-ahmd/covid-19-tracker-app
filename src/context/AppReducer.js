export default (state,action) => {
    switch(action.type){
        case 'SORT_DATA':
            return{
                ...state,
                data : state.data.sort((a,b) => {
                    if(action.payload !== 'country'){
                        return (Number(a[action.payload]) > Number(b[action.payload]) ? 1 : -1)
                    }else{
                        return (a[action.payload] > b[action.payload] ? 1 : -1)
                    }
                })
            }
        case 'SORT_DATA_REV':
            return{
                ...state,
                data : state.data.sort((a,b) => {
                    if(action.payload !== 'country'){
                        return (Number(a[action.payload]) > Number(b[action.payload]) ? -1 : 1)
                    }else{
                        return (a[action.payload] > b[action.payload] ? -1 : 1)
                    }
                })
            }
        case 'ADD_DATA':
            return{
                ...state,
                data : action.payload
            }
        
        default: return state;
    }
}