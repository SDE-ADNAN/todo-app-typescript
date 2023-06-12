import {TodoItem} from "../App"

const data : TodoItem[]  = [{
    id:"1",
    title: " Todo no.1",
    todos: [
        {
            id:"2",
            title: " Todo no.1",
            todos: [] 
        },
        {
            id:"3",
            title: " Todo no.1",
            todos: [
                {
                    id:"4",
                    title: " Todo no.1",
                    todos: [
                        {
                            id:"5",
                            title: " Todo no.1",
                            todos: []
                        }
                    ] 
                }
            ] 
        },
        {
            id:"6",
            title: " Todo no.1",
            todos: [] 
        },
    ]
}]

export default data