
let config = {
    __DEGUGGING__:false,
    backEndServer:'https://morningtime-server.herokuapp.com',
    frontEndServer:'https://www.morningti.me',
    alertD: function(first, second) {
        if (this.__DEGUGGING__) {
            console.log(first)
            if (second) {
                console.log(second)
            }
        }
    }
}



export default config