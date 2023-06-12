import {TodoItem} from "../App"

const data : TodoItem[]  = [{
    id:"1",
    title: " add lecture notes",
    showInput:false,
    todo: [
        {
            id:"2",
            title: " do home work",
                showInput:false,
            todo: [] 
        },
        {
            id:"3",
            title: " go for a walk",
                showInput:false,
            todo: [
                {
                    id:"4",
                    title: "go to gym",
                        showInput:false,
                    todo: [
                        {
                            id:"5",
                            title: " call papa",
                                showInput:false,
                            todo: []
                        }
                    ] 
                }
            ] 
        },
        {
            id:"6",
            title: "do assignment",
                showInput:false,
            todo: [] 
        },
    ]
}]

export default data